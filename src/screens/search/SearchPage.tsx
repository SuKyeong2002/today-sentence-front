import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

export default function SearchPage() {
  return (
    <Container>
      <TodayDate>검색</TodayDate>
    </Container>
  );
}


const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

const TodayDate = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.title}px;
  font-weight: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text};
`;
