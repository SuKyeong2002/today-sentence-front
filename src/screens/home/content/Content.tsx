import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import styled from 'styled-components';
import Interaction from '../Interaction/Interaction';

export default function Content() {
  // api 연동 전 임의의 데이터 지정 (404 에러로 실제 유저 id 활용)
  const likesCount = 42;
  const bookmarkCount = 83;
  const postId = 29;

  return (
    <ScrollContainer>
      <ContentWrapper>
        <BookContainer>
          <ResponsiveImage
            source={require('@/assets/image/bookCover.png')}
            resizeMode="contain"
          />
          <BookWrapper>
            <BookCategory>시/소설/에세이</BookCategory>
            <BookTitle>채식주의자</BookTitle>
            <BookWriter>한강</BookWriter>
          </BookWrapper>
        </BookContainer>
        <BookRecord>
          <BookSentence>
            나는 내가 지금처럼 살기 위해 태어난 게 아니라고 생각했어요. 그런데도
            이렇게 살아가는 나 자신이 너무 낯설고 싫어요. 어떤 순간에는 내 몸이
            내 것이 아닌 것 같았고, 그 안에 내가 아닌 무언가가 자리 잡고 있는
            듯한 느낌이 들었어요. 나를 삼키고 억누르려는 그것 때문에 숨이 막힐
            것만 같았죠. 어쩌면 나는 태어날 때부터 잘못된 방향으로 흘러왔는지도
            몰라요. 나의 의지와 상관없이 나를 둘러싼 이 세계가 내 삶의 방향을
            정하고, 내가 선택하지 않은 길로 나를 밀어 넣은 것 같아요. 내가 왜
            이런 삶을 살아야 하는지, 왜 이렇게까지 해야 하는지 그 이유조차 알 수
            없는 내가 너무 두려워요. 내가 살아가야 할 이유가 나 자신에게 있지
            않고, 타인의 요구에 따라 정해지는 느낌이 드는 순간, 나는 나
            자신으로부터 멀어져 가고 있다는 걸 느껴요.
          </BookSentence>
          <BookTag>#영혜 #자아의해체 #노벨문학상작가</BookTag>
        </BookRecord>
        <Interaction postId={postId} likesCount={likesCount} bookmarkCount={bookmarkCount} />
      </ContentWrapper>
    </ScrollContainer>
  );
}

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

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
const ResponsiveImage = styled(Image)`
  width: 110px;
  height: 150px;
`;
