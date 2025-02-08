import React from 'react';
import styled from 'styled-components';
import {View, StyleSheet, Image} from 'react-native';
import CustomHeader from '@/components/Header/CustomHeader';

export default function HomePage() {
  return (
    <View>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <TitleWrapper>
        <TodayDate>12월 10일 화요일</TodayDate>
        <TodayAlert>오늘의 명언이 도착했어요!</TodayAlert>
      </TitleWrapper>
      <ContentWrapper>
        <ResponsiveImage
          source={require('../../assets/image/bookCover.png')} 
          resizeMode="contain"
        />
      </ContentWrapper>
    </View>
  );
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px;
  gap: 12px;
`;

const ContentWrapper = styled(View)`
  height: 75%;
  padding: 20px;
  align-items: center;
  gap: 10px;
  margin: 20px;
  align-self: stretch;
  elevation: 15;
  border-radius: 15px;
  shadow-color: #000;
  background: ${({theme}) => theme.colors.white};
`;

const TodayDate = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.xLarge}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

const TodayAlert = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

const ResponsiveImage = styled(Image)`
`;
