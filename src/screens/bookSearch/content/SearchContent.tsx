import React, {useEffect, useState} from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import styled from 'styled-components';
import Interaction from '../../home/Interaction/Interaction';
import {useRoute} from '@react-navigation/native';
import {KAKAO_API_KEY} from '@env';
import axios from 'axios';

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
  const {quotes = []} = route.params as {quotes?: QuoteData[]};
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails: Record<string, string> = {};
      for (const quote of quotes) {
        try {
          const response = await axios.get(
            `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(quote.bookTitle)}`,
            {
              headers: {Authorization: `KakaoAK ${KAKAO_API_KEY}`},
            },
          );
          if (response.data.documents.length > 0) {
            newThumbnails[quote.bookTitle] =
              response.data.documents[0].thumbnail;
          } else {
            newThumbnails[quote.bookTitle] = 'https://via.placeholder.com/150';
          }
        } catch (error) {
          console.error('Failed to fetch thumbnail:', error);
        }
      }
      setThumbnails(newThumbnails);
    };

    fetchThumbnails();
  }, [quotes]);

  return (
    <ScrollContainer>
      {quotes.map((quote, index) => (
        <ContentWrapper key={index}>
          <BookContainer>
            <ResponsiveImage
              source={{
                uri:
                  thumbnails[quote.bookTitle] ||
                  'https://via.placeholder.com/150',
              }}
              resizeMode="contain"
            />
            <BookWrapper>
              <BookCategory>
                {quote.category
                  ? categoryMap[quote.category] || quote.category
                  : '카테고리 없음'}
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
      ))}
    </ScrollContainer>
  );
}

// 스타일 정의
const ScrollContainer = styled(ScrollView)`
`;

const ContentWrapper = styled(View)`
  padding: 20px;
  gap: 20px;
  margin: 10px 20px 10px 20px;
  elevation: 10;
  border-radius: 15px;
  shadow-color: #000;
  background: ${({theme}) => theme.colors.white};
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
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: var(--Gray, rgba(80, 80, 80, 0.33));
  border-radius: 8px;
  background: #f5f4f5;
  padding: 4px 8px;
`;

const BookTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.title}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`;

const BookWriter = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`;

const BookRecord = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 5px;
`;

const BookSentence = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const BookTag = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.lightGray};
`;

const ResponsiveImage = styled(Image)`
  width: 100px;
  height: 150px;
  border-radius: 10px;
`;
