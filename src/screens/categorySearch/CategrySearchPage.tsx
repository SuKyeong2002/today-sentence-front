import React, {useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useRoute} from '@react-navigation/native';
import BackHeader from '@/components/Header/BackHeader';
import SearchContent from '../bookSearch/content/SearchContent';

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

      <BooklistWrapper>
        <BookImage
          source={require('@/assets/image/bookCover5.png')}
          resizeMode="contain"
        />
        <BookContainer>
          <BookTitle>살아갈 날들을 위한 괴테의 시</BookTitle>
          <BookWriter>김종원</BookWriter>
          <BookPublisher>퍼스트펭귄 / 2025</BookPublisher>
          <CategoryWrapper>
            <CategoryUserImage
              source={require('@/assets/image/categoryUser.png')}
              resizeMode="contain"
            />
            <CategoryUserNumber>53</CategoryUserNumber>
          </CategoryWrapper>
        </BookContainer>
      </BooklistWrapper>
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

// 책
const BooklistWrapper = styled(View)`
  width: 90%;
  display: flex;
  padding: 10px;
  margin: 0 20px;
  align-items: flex-start;
  flex-direction: row;
  gap: 32px;
  align-self: stretch;
  border-radius: 15px;
  background: ${({theme}) => theme.colors.white};
`;

const BookContainer = styled(View)`
  display: flex;
  height: 88px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const BookTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

const BookWriter = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.lightGray};
`;

const BookPublisher = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.lightGray};
`;

const CategoryWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CategoryUserNumber = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`;

// 이미지
const BookImage = styled(Image)`
  width: 94px;
  height: 136px;
`;
const CategoryUserImage = styled(Image)`
  width: 16px;
  heigth: 16px;
`;
