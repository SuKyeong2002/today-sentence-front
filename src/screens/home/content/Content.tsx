import Sentence from '@/components/Book/Sentence';
import { useHome } from '@/hooks/useHome';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components';

export default function Content() {
  const {data: postData, isLoading, error} = useHome();

  if (isLoading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoadingContainer>
    );

  const errorMessage =
    error instanceof Error ? error.message : '데이터를 불러오는 중 오류 발생';
  if (error) return <ErrorText>데이터 불러오기 실패: {errorMessage}</ErrorText>;
  if (!postData) return <ErrorText>데이터가 없습니다.</ErrorText>;

  console.log(postData);

  return (
    <ScrollContainer>
      <Sentence
        bookAuthor={postData.bookAuthor}
        postId={postData.postId}
        postWriter={postData.postWriter}
        postContent={postData.postContent}
        category={postData.category}
        hashtags={postData.hashtags}
        createAt={postData.createAt}
        likesCount={postData.likesCount}
        bookmarkCount={postData.bookmarkCount}
        commentCount={postData.commentCount}
        bookTitle={postData.bookTitle}
        bookCover={postData.bookCover}
      />
    </ScrollContainer>
  );
}

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  margin: 0 20px;
`;

const ErrorText = styled(Text)`
  color: red;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
