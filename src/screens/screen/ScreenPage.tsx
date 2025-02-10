import {Alert, View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileEditItem from '@/components/Button/ProfileEditItem';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileBackHeader} from '@/components/Header/ProfileBackHeader';

type RootStackParamList = {
  Font: undefined;
};

export default function ScreenPage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  const handleLanguageChange = async (lang: string) => {
    await changeLanguage(lang);
    setLanguage(lang);
  };

  const handleFontChange = async (selectedFont: string) => {
    await AsyncStorage.setItem('selectedFont', selectedFont);
    setFont(selectedFont);
  };

  useEffect(() => {
    (async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        setFont(storedFont);
      }
    })();
  }, []);

  type NavigationProp = StackNavigationProp<RootStackParamList, 'Font'>;

  return (
    <View style={{flex: 1}}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ScreenContainer fontFamily={font}>
        <ProfileEditItem
          title={t('테마')}
          onPress={() =>
            Alert.alert(t('테마 선택'), t('원하는 테마를 선택하세요'), [
              {text: t('라이트'), style: 'cancel'},
              {text: t('다크'), style: 'default'},
            ])
          }
          font={font}
        />
        <ProfileEditItem
          title={t('폰트')}
          onPress={() => navigation.navigate('Font')}
          font={font}
        />
        <ProfileEditItem
          title={t('언어')}
          onPress={() =>
            Alert.alert(t('언어 선택'), t('사용할 언어를 선택해주세요'), [
              {text: t('영어'), onPress: () => handleLanguageChange('en')},
              {text: t('한국어'), onPress: () => handleLanguageChange('ko')},
            ])
          }
          font={font}
        />
      </ScreenContainer>
    </View>
  );
}

const ScreenContainer = styled(View)<{fontFamily: string}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  font-family: ${props => props.fontFamily};
  margin-top: 20px;
`;
