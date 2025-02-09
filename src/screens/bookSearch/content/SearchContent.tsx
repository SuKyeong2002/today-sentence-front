import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';
import Interaction from '../../home/Interaction/Interaction';

export default function SearchContent() {
  return (
    <>
      <ContentWrapper>
        <BookContainer>
          <ResponsiveImage
            source={require('@/assets/image/bookCover5.png')}
            resizeMode="contain"
          />
          <BookWrapper>
            <BookCategory>시/소설/에세이</BookCategory>
            <BookTitle>살아갈 날들을 위한 괴테의 시</BookTitle>
            <BookWriter>김종원</BookWriter>
          </BookWrapper>
        </BookContainer>
        <BookRecord>
          <BookSentence>
            자신을 아는 것은 모든 삶의 출발점입니다. 우리는 수없이 많은 외부의
            기대 속에서 흔들리고 길을 잃곤 하지만, 진정한 나를 발견하는 순간
            삶은 비로소 그 의미를 드러냅니다. 스스로의 가치를 믿고 세상에
            맞추기보다 나다운 삶을 선택하는 용기를 가지세요. 괴테는 말합니다.
            '스스로에 대한 신뢰가 없다면, 큰일을 할 수 없으며, 작은 일에서도
            기쁨을 찾을 수 없다.' 삶은 단순히 살아내는 것이 아니라 스스로 의미를
            만들어가는 과정입니다. 오늘을 사랑하며 내일을 기대하세요. 그것이
            당신의 인생을 빛나게 할 것입니다.
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
