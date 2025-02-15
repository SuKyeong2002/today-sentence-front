import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import Interaction from '../../home/Interaction/Interaction';
import { useRoute } from '@react-navigation/native';
import { KAKAO_API_KEY } from '@env';
import axios from 'axios';
import { useBookSearch } from '@/hooks/useBookSearch';
import { useTagSearch } from '@/hooks/useTagSearch';

const categoryMap: Record<string, string> = {
  POEM_NOVEL_ESSAY: '시/소설/에세이',
  ECONOMY_MANAGEMENT: '경제/경영',
  HISTORY_SOCIETY: '역사/사회',
  PHILOSOPHY_PSYCHOLOGY: '철학/심리학',
  SELF_DEVELOPMENT: '자기계발',
  ARTS_PHYSICAL: '예체능',
  KID_YOUTH: '아동/청소년',
  TRAVEL_CULTURE: '여행/문화',
  ETC: '기타',
};

interface QuoteData {
  category: string;
  bookTitle: string;
  bookAuthor: string;
  postContent: string;
  hashtags: string;
  likesCount: number;
  postId: number;
}

export default function SearchContent() {
  const route = useRoute();
  const { bookTitle, tag } = route.params as { bookTitle?: string; tag?: string };

  // 📌 책 제목으로 검색한 경우
  const { data: bookData = [] } = useBookSearch(bookTitle || "");

  // 📌 태그로 검색한 경우
  const { data: tagData = [] } = useTagSearch("tag", tag || "");

  // 📌 최종적으로 보여줄 데이터 (조건 분기)
  let quotes: QuoteData[] = [];

  if (bookTitle) {
    // ✅ 책 제목으로 검색한 경우, 전체 데이터 사용
    quotes = bookData as QuoteData[];
  } else if (tag) {
    // ✅ 태그 검색 시, 해당 태그를 포함하는 명언만 필터링
    quotes = (tagData as QuoteData[]).filter((quote) => quote.hashtags.includes(tag));
  }

  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const fetchedTitles = useRef(new Set<string>()); // 중복 요청 방지

  useEffect(() => {
    const fetchThumbnails = async () => {
      if (!quotes || quotes.length === 0) return;

      const newThumbnails: Record<string, string> = {};
      for (const quote of quotes) {
        if (!quote.bookTitle || fetchedTitles.current.has(quote.bookTitle)) continue;
        fetchedTitles.current.add(quote.bookTitle);

        try {
          const response = await axios.get(
            `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(quote.bookTitle)}`,
            {
              headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
            },
          );
          newThumbnails[quote.bookTitle] = response.data.documents?.[0]?.thumbnail || 'https://via.placeholder.com/150';
        } catch (error) {
          console.error('Failed to fetch thumbnail:', error);
        }
      }

      setThumbnails((prev) => ({ ...prev, ...newThumbnails }));
    };

    fetchThumbnails();
  }, [quotes]);

  return (
    <ScrollContainer>
      {quotes.length > 0 ? (
        quotes.map((quote: QuoteData, index: number) => (
          <ContentWrapper key={index}>
            <BookContainer>
              <ResponsiveImage
                source={{
                  uri: thumbnails[quote.bookTitle] || 'https://via.placeholder.com/150',
                }}
                resizeMode="contain"
              />
              <BookWrapper>
                <BookCategory>
                  {categoryMap[quote.category] || quote.category || '카테고리 없음'}
                </BookCategory>
                <BookTitle>{quote.bookTitle}</BookTitle>
                <BookWriter>{quote.bookAuthor}</BookWriter>
              </BookWrapper>
            </BookContainer>
            <BookRecord>
              <BookSentence>{quote.postContent}</BookSentence>
              <BookTag>{quote.hashtags}</BookTag>
            </BookRecord>
            <Interaction likesCount={quote.likesCount} />
          </ContentWrapper>
        ))
      ) : (
        <NoResultText>검색 결과가 없습니다.</NoResultText>
      )}
    </ScrollContainer>
  );
}

// 📌 스타일 정의
const ScrollContainer = styled(ScrollView)``;

const ContentWrapper = styled(View)`
  padding: 20px;
  gap: 20px;
  margin: 10px 20px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.white};
`;

const BookContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const BookWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
`;

const BookCategory = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 500;
  color: var(--Gray, rgba(80, 80, 80, 0.33));
  border-radius: 8px;
  background: #f5f4f5;
  padding: 4px 8px;
`;

const BookTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  font-weight: 600;
`;

const BookWriter = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 500;
`;

const BookRecord = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 5px;
`;

const BookSentence = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 400;
`;

const BookTag = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 400;
`;

const NoResultText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const ResponsiveImage = styled(Image)`
  width: 100px;
  height: 150px;
  border-radius: 10px;
`;
