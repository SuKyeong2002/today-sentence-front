import BackHeader from '@/components/Header/BackHeader';
import styled from 'styled-components';
import {View, FlatList} from 'react-native';
import React from 'react';
import SearchContent from './content/SearchContent';

export default function BookSearchPage() {
  return (
    <Container>
      <BackHeader
        searchKeyword="검색"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <SearchContent />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const BooklistWrapper = styled(View)`
  margin: 20px 0;
`;
