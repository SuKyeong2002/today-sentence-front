import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import ProfileEditItem from '@/components/Button/ProfileEditItem';
import { ProfileBackHeader } from '@/components/Header/ProfileBackHeader';
import CustomModal from '@/components/Modal/CustomModal';
import { changeLanguage, getStoredLanguage } from '@/utils/language';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext'; 

type RootStackParamList = {
  Font: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Font'>;

export default function ScreenPage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode, setThemeMode } = useTheme();

  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA' }}>
      <ScreenContainer fontFamily={font}>
        <ProfileBackHeader
          searchKeyword={t('설정')}
          onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
          onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
        />
        <ProfileEditItem
          title={t('테마')}
          onPress={() => setModalVisible2(true)}
          font={font}
        />
        <CustomModal
          visible={modalVisible2}
          title={t('테마 선택')}
          message={t('원하는 테마를 선택하세요')}
          leftButton={t('라이트')}
          rightButton={t('다크')}
          onCancel={() => { console.log("라이트 모드 적용됨"); setThemeMode(false);  setModalVisible2(false)}}
          onConfirm={() => { console.log("다크 모드 적용됨"); setThemeMode(true);  setModalVisible2(false)}}
        />
        <ProfileEditItem
          title={t('폰트')}
          onPress={() => navigation.navigate('Font')}
          font={font}
        />
        <ProfileEditItem
          title={t('언어')}
          onPress={() => setModalVisible(true)}
          font={font}
        />
        <CustomModal
          visible={modalVisible}
          title={t('언어 선택')}
          message={t('사용할 언어를 선택해주세요')}
          leftButton={t('한국어')}
          rightButton={t('영어')}
          onCancel={() => changeLanguage('ko')}
          onConfirm={() => changeLanguage('en')}
        />
      </ScreenContainer>
    </View>
  );
}

const ScreenContainer = styled(View)<{ fontFamily: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  font-family: ${(props) => props.fontFamily};
`;
