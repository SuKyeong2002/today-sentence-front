import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components';
import Profile from './profile/Profile';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ProfileEditItem from '@/components/Button/ProfileEditItem';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '@/components/Modal/CustomModal';

type RootStackParamList = {
  Setting: undefined;
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [font, setFont] = useState<string>('PretendardRegular');

  useEffect(() => {
    (async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        setFont(storedFont);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <SettingContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <SettingImage
            source={require('@/assets/image/setting.png')}
            resizeMode="contain"
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
const SettingImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
