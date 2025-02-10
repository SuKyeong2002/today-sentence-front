import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

type RootStackParamList = {
  BookSearch: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function InquiryTag() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation(); 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <RegistrationTagContainer>
              <RegistrationText>🤎 {t('인기 조회 태그')}</RegistrationText>
              <TagContainer>
                <TagWrapper>
                  <TagText onPress={() => navigation.navigate('BookSearch')}>
                    <TagTextLabel>{t('오늘의책')}</TagTextLabel>
                  </TagText>
                  <TagText>
                    <TagTextLabel>{t('명언추천')}</TagTextLabel>
                  </TagText>
                  <TagText>
                    <TagTextLabel>{t('1일1독')}</TagTextLabel>
                  </TagText>
                </TagWrapper>
                <TagWrapper>
                  <TagText>
                    <TagTextLabel>{t('책추천')}</TagTextLabel>
                  </TagText>
                  <TagText>
                    <TagTextLabel>{t('느좋')}</TagTextLabel>
                  </TagText>
                  <TagText>
                    <TagTextLabel>{t('카페')}</TagTextLabel>
                  </TagText>
                </TagWrapper>
              </TagContainer>
            </RegistrationTagContainer>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const RegistrationTagContainer = styled(View)`
  width: 90%;
  height: auto;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 10px;
  gap: 20px;
  margin: 10px 20px;
  flex-direction: row;
  background: ${({theme}) => theme.colors.white};
`;

const RegistrationText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

const TagContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
`;

const TagWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TagText = styled(TouchableOpacity)`
  display: flex;
  width: 30%;
  height: 40px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({theme}) => theme.colors.background};
  text-align: center;
`;

const TagTextLabel = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;
