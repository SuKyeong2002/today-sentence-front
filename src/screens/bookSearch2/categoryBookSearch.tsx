import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import SearchContent2 from './content/SearchContent2';
import { RouteProp } from '@react-navigation/native';
import { useCategorySearch } from '@/hooks/useCategorySearch';

interface Post {
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  bookPublisher: string;
  bookPublishingYear: number;
  postContent: string;
  hashtags: string;
  likesCount: number;
}

type RootStackParamList = {
  categoryBookSearch: { category: string };
};

interface Props {
  route: RouteProp<RootStackParamList, 'categoryBookSearch'>;
}

export default function categoryBookSearch({ route }: Props) {
  const { category } = route.params;
  const {data: posts, isLoading} = useCategorySearch(category);

  return (
    <Container>
      <BackHeader
        searchKeyword="검색"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : posts?.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BooklistWrapper>
              <SearchContent2 post={{...item, postId: item.postId, category}} />
            </BooklistWrapper>
          )}
        />
      ) : (
        <NoDataText>검색 결과가 없습니다.</NoDataText>
      )}
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
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
