import React,{useMemo} from 'react';
import {View, Text, ScrollView,FlatList,ActivityIndicator} from 'react-native';
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

  const size =10;


  const {
    data: bookData,
    isLoading: bookLoading,
    isError: bookError,
    fetchNextPage: bookFetchNextPage,
    hasNextPage: bookHasNextPage
  } = useBookSearch(bookTitle || '', size);

  const {
    data: tagData,
    isLoading: tagLoading,
    isError: tagError,
    fetchNextPage: tagFetchNextPage,
    hasNextPage: tagHasNextPage
  } = useTagQuoteSearch(tag || '', size);

  const isLoading = bookLoading || tagLoading;
  const isError = bookError || tagError;

  const combinedData = useMemo(() => {
    if (!bookData?.pages && !tagData?.pages) return [];

    const bookPosts = bookData?.pages?.flatMap((page) =>
      (page.posts || []).map((post: any, index: string | number) => ({
        ...post,
        interaction: (page.interaction || [])[index] || { isLiked: false, isSaved: false },
      }))
    ) || [];

    const tagPosts = tagData?.pages?.flatMap((page) =>
      (page.posts || []).map((post: any, index: string | number) => ({
        ...post,
        interaction: (page.interaction || [])[index] || { isLiked: false, isSaved: false },
      }))
    ) || [];

    return [...bookPosts, ...tagPosts];
  }, [bookData, tagData]);


  return (
      <>
        {isLoading ? (
          <LoadingText>로딩 중...</LoadingText>
        ) : isError ? (
          <ErrorText>오류 발생</ErrorText>
        ) : combinedData.length > 0 ? (
          <FlatList
            data={combinedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <SentenceContainer key={item.id}>
                <Sentence post={item} interaction={item.interaction} />
              </SentenceContainer>
            )}
            onEndReached={() => {
              if (!isLoading && (bookHasNextPage || tagHasNextPage)) {
                if (bookHasNextPage) {
                  bookFetchNextPage();
                } else if (tagHasNextPage) {
                  tagFetchNextPage();
                }
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          />
        ) : (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
      </>
    );
  }

// 스타일 정의
const SentenceContainer = styled(View)`
  margin: 10px 20px;
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