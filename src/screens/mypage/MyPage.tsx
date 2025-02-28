import ProfileEditItem from '@/components/Button/ProfileEditItem';
import CustomModal from '@/components/Modal/CustomModal';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Profile from './profile/Profile';

type RootStackParamList = {
  Setting: undefined;
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

export default function MyPage() {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [font, setFont] = useState<string>('PretendardRegular');
  const {isDarkMode, setThemeMode} = useTheme();

  useEffect(() => {
    (async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        setFont(storedFont);
      }
    })();
  }, []);

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <SettingContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image
            source={require('@/assets/image/setting.png')}
            style={[
              styles.ArrowIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </TouchableOpacity>
      </SettingContainer>
      <Profile />
      <ListContainer>
        <ProfileEditItem
          title={t('프로필 편집')}
          onPress={() => navigation.navigate('Profile')}
          font={font}
        />
        <ProfileEditItem
          title={t('프리미엄')}
          onPress={() => setModalVisible(true)}
          font={font}
        />
        <ProfileEditItem
          title={t('커스터마이징')}
          onPress={() => setModalVisible(true)}
          font={font}
        />
        <CustomModal
          visible={modalVisible}
          title={t('오픈 준비중')}
          message={t('곧 이용하실 수 있어요 :)')}
          rightButton={t('확인')}
          onConfirm={() => setModalVisible(false)}
        />
      </ListContainer>
    </View>
  );
}

// 설정
const SettingContainer = styled(View)`
  width: 90%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 20px 20px 0 20px;
  gap: 24px;
`;

const ListContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

// 이미지
const styles = StyleSheet.create({
  ArrowIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
});