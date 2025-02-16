import React, { useState, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, Text, Switch } from 'react-native';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import SearchContent2 from './content/SearchContent2';
import { RouteProp } from '@react-navigation/native';
import { useCategorySearch } from '@/hooks/useCategorySearch';

interface Post {
  postId: number;
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  bookPublisher: string;
  bookPublishingYear: number;
  postContent: string;
  hashtags: string;
  likesCount: number;
  createAt: string;
}

type RootStackParamList = {
  categoryBookSearch: { category: string };
};

interface Props {
  route: RouteProp<RootStackParamList, 'categoryBookSearch'>;
}

export default function categoryBookSearch({ route }: Props) {
  const { category } = route.params;
  const { data: posts, isLoading } = useCategorySearch(category);
  const [sortByLatest, setSortByLatest] = useState(false); 

  const sortedPosts = useMemo(() => {
    if (!posts) return [];

    return [...posts].sort((a, b) => {
      if (sortByLatest) {
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
      } else {
        return b.likesCount - a.likesCount;
      }
    });
  }, [posts, sortByLatest]);

  return (
    <Container>
      <BackHeader
        searchKeyword="검색"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ToggleContainer>
        <Switch value={sortByLatest} onValueChange={() => setSortByLatest((prev) => !prev)} />
        <ToggleText>최신순</ToggleText>
      </ToggleContainer>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sortedPosts.length > 0 ? (
        <FlatList
          data={sortedPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BooklistWrapper>
              <SearchContent2 post={item} sortByLatest={false} />
            </BooklistWrapper>
          )}
        />
      ) : (
        <NoDataText>검색 결과가 없습니다.</NoDataText>
      )}
    </Container>
  );
}

// 스타일 정의
const Container = styled(View)`
  flex: 1;
`;

const ToggleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 20px;
`;

const ToggleText = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`;

const BooklistWrapper = styled(View)`
  margin: 10px 0;
`;

const NoDataText = styled(Text)`
  text-align: center;
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;
