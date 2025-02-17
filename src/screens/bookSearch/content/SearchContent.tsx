import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components';
import {useRoute} from '@react-navigation/native';
import {useBookSearch} from '@/hooks/useBookSearch';
import {useTagQuoteSearch} from '@/hooks/useTagQuoteSearch';
import Sentence from '@/components/Book/Sentence';

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
  const {bookTitle, tag} = route.params as {bookTitle?: string; tag?: string};

  const {
    data: bookQuotes = [],
    isLoading: bookLoading,
    error: bookError,
  } = useBookSearch(bookTitle || '');

  const {
    data: tagQuotes = [],
    isLoading: tagLoading,
    error: tagError,
  } = useTagQuoteSearch(tag || '');

  const isLoading = bookLoading || tagLoading;
  const isError = bookError || tagError;

  const rawQuotes = bookTitle ? bookQuotes : tag ? tagQuotes : [];
  console.log("rawQuotes", rawQuotes);
  console.log(typeof rawQuotes);

  // const quotes: QuoteData[] = Array.isArray(rawQuotes) ? rawQuotes : [];


  console.log('🚀 개별 quote 확인:', rawQuotes.data[0]);
  console.log('🚀 postContent 타입:', typeof rawQuotes.data[0].postContent);
  console.log('🚀 hashtags 타입:', typeof rawQuotes.data[0].hashtags);

  return (
    <ScrollContainer>
      {/* {isLoading ? (
        <LoadingText>로딩 중...</LoadingText>
      ) : isError ? (
        <ErrorText>오류 발생</ErrorText>
      ) : quotes.length > 0 ? (
        quotes.map(quote => (
          <SentenceContainer key={quote.postId}>
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
      )} */}
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

const LoadingText = styled(Text)`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const ErrorText = styled(Text)`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;
