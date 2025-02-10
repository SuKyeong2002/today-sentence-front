import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styled from 'styled-components';
import {useRoute} from '@react-navigation/native';
import BackHeader from '@/components/Header/BackHeader';
import CategorySearchContent from './content/CategorySearchContent';
import CategorySearchContent2 from './content/CategorySearchContent2';
import CategorySearchContent3 from './content/CategorySearchContent3';
import CategorySearchContent4 from './content/CategorySearchContent4';

// 10개의 더미 데이터
const initialData = Array.from({length: 10}, (_, i) => ({
  id: i,
  content: `Item ${i + 1}`,
}));

export default function CategorySearchPage() {
  const route = useRoute();
  const {category} = route.params as {category: string};

  const [data, setData] = useState(initialData);
  const [isLatest, setIsLatest] = useState(true);

  const toggleSort = () => {
    setIsLatest(!isLatest);
    setData(prevData => [...prevData].reverse());
  };

  return (
    <Container>
      <BackHeader
        searchKeyword="카테고리"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />

      <SortContainer>
        <SortToggle onPress={toggleSort} isLatest={isLatest}>
          <SortCircle isLatest={isLatest} />
        </SortToggle>
        <SortLabel>최신순</SortLabel>
      </SortContainer>

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <CategoryContainer>
          <CategorySearchContent />
          <CategorySearchContent2 />
          <CategorySearchContent3 />
          <CategorySearchContent4 />
        </CategoryContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const SortContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 20px;
  gap: 10px;
`;

const SortLabel = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const SortToggle = styled(TouchableOpacity)<{isLatest: boolean}>`
  width: 45px;
  height: 25px;
  border-radius: 60px;
  background: ${({theme, isLatest}) =>
    isLatest ? theme.colors.primary : theme.colors.lightGray};
  padding: 3px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({isLatest}) => (isLatest ? 'flex-end' : 'flex-start')};
`;

const SortCircle = styled(View)<{isLatest: boolean}>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`;

// 카테고리 컨테이너
const CategoryContainer = styled(View)`
  gap: 10px;
`;
