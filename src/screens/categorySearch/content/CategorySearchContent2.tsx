import React from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  BookSearch2: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookSearch2'>;

export default function CategorySearchContent2() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('BookSearch2')}>
        <BooklistWrapper>
          <BookImage
            source={require('@/assets/image/bookCover6.png')}
            resizeMode="contain"
          />
          <BookContainer>
            <BookTitle>소설 보다 : 겨울 2024</BookTitle>
            <BookWriter>성혜령, 이주혜, 이희주</BookWriter>
            <BookPublisher>문학과지성사 / 2024</BookPublisher>
            <CategoryWrapper>
              <CategoryUserImage
                source={require('@/assets/image/categoryUser.png')}
                resizeMode="contain"
              />
              <CategoryUserNumber>24</CategoryUserNumber>
            </CategoryWrapper>
          </BookContainer>
        </BooklistWrapper>
      </TouchableOpacity>
    </>
  );
}

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
  border-radius: 10px;
  overflow: hidden;
`;
const CategoryUserImage = styled(Image)`
  width: 14px;
  heigth: 14px;
`;
