import {useTheme} from '@/context/ThemeContext';
import {useFamousTags} from '@/hooks/useFamousTags';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components';

type RootStackParamList = {
  BookSearch: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function InquiryTag() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
  const {data, isLoading, error} = useFamousTags();
  const {isDarkMode, theme} = useTheme();

  if (isLoading) return <Text>{t('로딩 중...')}</Text>;
  if (error) return <Text>{t('태그를 불러오지 못했습니다')}</Text>;
  if (!data) return <Text>{t('태그 데이터가 없습니다')}</Text>;

  const searchTags: string[] = (data.search || []).slice(0, 6);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <RegistrationTagContainer isDarkMode={isDarkMode}>
              <RegistrationText isDarkMode={isDarkMode}>
                🤎 {t('인기 조회 태그')}
              </RegistrationText>
              <TagContainer>
                <TagWrapper>
                  {searchTags.map((tag: string, index: number) => (
                    <TagText
                      key={index}
                      onPress={() => navigation.navigate('BookSearch',{tag})}>
                      <TagTextLabel>
                        {tag.length > 3 ? `${tag.substring(0, 3)}...` : tag}
                      </TagTextLabel>
                    </TagText>
                  ))}
                </TagWrapper>
              </TagContainer>
            </RegistrationTagContainer>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// 스타일
const getFontWeight = (fontFamily: string) => {
  switch (fontFamily) {
    case 'Pretendard-Regular':
      return '700'; 
    case 'BookendBataanRegular':
    case 'OnggeulipKimkonghae':
    case 'HakgyoansimGeurimilgiTTFR':
    case 'OnggeulipWicelist':
    case 'KyoboHandwriting2020pdy':
      return '600'; 
    default:
      return 'normal';
  }
};

const RegistrationTagContainer = styled(View)<{isDarkMode: boolean}>`
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 20px;
  flex-direction: column;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
  gap: 20px;
`;

const RegistrationText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: ${({ theme }) => getFontWeight(theme.fontFamily)};
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const TagContainer = styled(View)`
  width: 100%;
`;

const TagWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const TagText = styled(TouchableOpacity)`
  width: 30%;
  height: 40px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({theme}) => theme.colors.background};
`;

const TagTextLabel = styled(Text)<{theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;
