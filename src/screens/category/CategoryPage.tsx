import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

const TextStyle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.title}px;
  font-weight: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text};
`;

export default function CategoryPage() {
  return (
    <Container>
      <TextStyle>카테고리</TextStyle>
    </Container>
  );
}
