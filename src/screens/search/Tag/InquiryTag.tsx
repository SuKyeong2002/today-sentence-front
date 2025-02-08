import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  BookSearch: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function InquiryTag() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <RegistrationTagContainer>
      <RegistrationText>🤎 인기 조회 태그</RegistrationText>
      <TagContainer>
        <TagWrapper>
          <TagText onPress={() => navigation.navigate('BookSearch')}>
            <Text>오늘의책</Text>
          </TagText>
          <TagText>
            <Text>명언추천</Text>
          </TagText>
          <TagText>
            <Text>1일1독</Text>
          </TagText>
        </TagWrapper>
        <TagWrapper>
          <TagText>
            <Text>책추천</Text>
          </TagText>
          <TagText>
            <Text>느좋</Text>
          </TagText>
          <TagText>
            <Text>카페</Text>
          </TagText>
        </TagWrapper>
      </TagContainer>
    </RegistrationTagContainer>
  );
}

const RegistrationTagContainer = styled(View)`
  width: 90%;
  height: 20%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 10px;
  gap: 20px;
  margin: 0 20px;
  flex-direction: row;
  background: ${({theme}) => theme.colors.white};
`;

const RegistrationText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const TagContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TagWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TagText = styled(Text)`
  display: flex;
  width: 85px;
  height: 25px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${({theme}) => theme.colors.background};
  text-align: center;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;
