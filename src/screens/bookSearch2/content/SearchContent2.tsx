import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';
import Interaction from '../../home/Interaction/Interaction';

export default function SearchContent2() {
  return (
    <>
      <ContentWrapper>
        <BookContainer>
          <ResponsiveImage
            source={require('@/assets/image/bookCover6.png')}
            resizeMode="contain"
          />
          <BookWrapper>
            <BookCategory>시/소설/에세이</BookCategory>
            <BookTitle>소설 보다 : 겨울 2024</BookTitle>
            <BookWriter>성혜령, 이주혜, 이희주</BookWriter>
          </BookWrapper>
        </BookContainer>
        <BookRecord>
          <BookSentence>
            "야, 너 지금 우리 오빠 버린 거야?" 아니, 내가 버린 게 아니라...
            백주는 말하려다 말고 주저앉았다. 발밑의 땅이 조금씩 갈라졌다.
            이제서야, 땅이 꺼지는구나, 백누는 설경이 있는 몇 발자국 앞까지 영영
            갈 수 없었다.
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
