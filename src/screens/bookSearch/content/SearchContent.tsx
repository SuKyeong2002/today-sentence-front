import React, {useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components';
import {useRoute} from '@react-navigation/native';
import {useBookSearch} from '@/hooks/useBookSearch';
import {useTagSearch} from '@/hooks/useTagSearch';
import Sentence from '@/components/Book/Sentence';

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
  postId: number;
  postWriter: string;
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  postContent: string;
  hashtags: string;
  likesCount: number;
  bookmarkCount: number;
  createAt: string;
}

export default function SearchContent() {
  const route = useRoute();
  const {bookTitle} = route.params as {bookTitle?: string};
  const {tag} = route.params as {tag?: string};

  const {data: bookData = []} = useBookSearch(bookTitle || '');
  const {data: tagData = []} = useTagSearch('tag', tag || '');

  let quotes: QuoteData[] = [];

  if (bookTitle) {
    quotes = bookData as QuoteData[];
  } else if (tag) {
    quotes = (tagData as QuoteData[]).filter(quote =>
      (quote.hashtags || '').includes(tag),
    );
  }

  const fetchedTitles = useRef(new Set<string>()); // 중복 요청 방지

  return (
    <ScrollContainer>
      {tag ? <TitleText>'{tag}' 태그 명언</TitleText> : null}
      {quotes.length > 0 ? (
        quotes.map((quote: QuoteData, index: number) => (
          <SentenceContainer key={index}>
            <Sentence
              postId={quote.postId}
              postWriter={quote.postWriter}
              postContent={quote.postContent}
              category={quote.category}
              hashtags={quote.hashtags}
              createAt={quote.createAt}
              likesCount={quote.likesCount}
              bookmarkCount={quote.bookmarkCount}
              bookTitle={quote.bookTitle}
              bookAuthor={quote.bookAuthor}
              bookCover={quote.bookCover}
            />
          </SentenceContainer>
        ))
      ) : (
        <NoResultText>검색 결과가 없습니다.</NoResultText>
      )}
    </ScrollContainer>
  );
}

// 스타일 정의
const ScrollContainer = styled(ScrollView)`
  margin: 10px 20px;
`;

const SentenceContainer = styled(View)`
  margin-bottom: 20px;
`;

const TitleText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const NoResultText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;
