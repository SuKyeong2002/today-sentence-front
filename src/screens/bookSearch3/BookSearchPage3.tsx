import BackHeader from '@/components/Header/BackHeader';
import styled from 'styled-components';
import {View, FlatList} from 'react-native';
import React from 'react';
import SearchContent3 from './content/SearchContent3';

// 10개 더미 데이터
const DATA = Array(10).fill(0);

export default function BookSearchPage3() {
  return (
    <Container>
      <BackHeader
        searchKeyword="검색"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <BooklistWrapper>
            <SearchContent3 />
          </BooklistWrapper>
        )}
      />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const BooklistWrapper = styled(View)`
  margin: 20px 0;
`;
