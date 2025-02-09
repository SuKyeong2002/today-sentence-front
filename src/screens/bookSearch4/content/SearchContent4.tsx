import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';
import Interaction from '../../home/Interaction/Interaction';

export default function SearchContent4() {
  return (
    <>
      <ContentWrapper>
        <BookContainer>
          <ResponsiveImage
            source={require('@/assets/image/bookCover8.png')}
            resizeMode="contain"
          />
          <BookWrapper>
            <BookCategory>시/소설/에세이</BookCategory>
            <BookTitle>시맨틱 에러 포토에세이</BookTitle>
            <BookWriter>왓챠, 래몽래인</BookWriter>
          </BookWrapper>
        </BookContainer>
        <BookRecord>
          <BookSentence>
            인연의 시작은 우연일까요? 선택일까요? 혹은 그 모든 것의 종합일까요?
          </BookSentence>
          <BookTag>#오늘의책</BookTag>
        </BookRecord>
        <Interaction />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled(View)`
  padding: 20px;
  align-items: flex-start;
  gap: 20px;
  margin: 0 20px;
  elevation: 10;
  border-radius: 15px;
  shadow-color: #000;
  background: ${({theme}) => theme.colors.white};
`;

// 책
const BookContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const BookWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
`;

const BookCategory = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: var(--Gray, rgba(80, 80, 80, 0.33));
  border-radius: 8px;
  background: #f5f4f5;
  padding: 4px 8px;
`;

const BookTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.title}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`;

const BookWriter = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`;

const BookRecord = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 5px;
`;

const BookSentence = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const BookTag = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.lightGray};
`;

// 이미지
const ResponsiveImage = styled(Image)``;
