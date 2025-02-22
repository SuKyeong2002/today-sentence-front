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
  commentCount: number;
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
//   console.log('rawQuotes', rawQuotes);
//   console.log('typeof rawQuotes', typeof rawQuotes);



  const posts = rawQuotes?.posts || [];
  const interaction = rawQuotes?.interaction || [];

  const combinedData = posts.map((post, index) => ({
      post,
      interaction: interaction[index],
  }));


  return (
    <ScrollContainer>
      {isLoading ? (
        <LoadingText>로딩 중...</LoadingText>
      ) : isError ? (
        <ErrorText>오류 발생</ErrorText>
      ) : combinedData.length > 0 ? (
        combinedData.map((combinedData, index) => (
          <SentenceContainer key={index}>
            <Sentence
                post ={ combinedData.post}
                interaction = {combinedData.interaction}
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