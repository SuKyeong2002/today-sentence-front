import {View, Text, Image, Alert, Linking} from 'react-native';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {SettingItem} from '@/components/Button/SettingItem';
import ProfileEditItem from '@/components/Button/ProfileEditItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileBackHeader} from '@/components/Header/ProfileBackHeader';
import {logout} from '@/api/logout';
import {useLogout} from '@/hooks/useLogout';
import CustomModal from '@/components/Modal/CustomModal';

type RootStackParamList = {
  News: undefined;
  Alert: undefined;
  Screen: undefined;
  Profile: undefined;
  Account: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'News'>;

export default function SettingPage() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
  const [font, setFont] = useState<string>('PretendardRegular');
  const {mutate: logout} = useLogout();
  const [modalVisible, setModalVisible] = useState(false);

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
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ListContainer>
        <SettingItem
          title={t('프로필')}
          iconSource={require('@/assets/image/settingProfileUser.png')}
          onPress={() => navigation.navigate('Profile')}
        />
        <SettingItem
          title={t('계정')}
          iconSource={require('@/assets/image/accountUser.png')}
          onPress={() => navigation.navigate('Account')}
        />
        <SettingItem
          title={t('화면')}
          iconSource={require('@/assets/image/screen.png')}
          onPress={() => navigation.navigate('Screen')}
        />
        <SettingItem
          title={t('알림')}
          iconSource={require('@/assets/image/notification.png')}
          onPress={() => navigation.navigate('Alert')}
        />
        <SettingItem
          title={t('공지사항')}
          iconSource={require('@/assets/image/news.png')}
          onPress={() => navigation.navigate('News')}
        />
        <SettingItem
          title={t('문의하기')}
          iconSource={require('@/assets/image/qa.png')}
          onPress={() => Linking.openURL('https://open.kakao.com/o/sVQUATah')}
        />
        <SettingItem
          title={t('개발자 응원하기')}
          iconSource={require('@/assets/image/good.png')}
          onPress={() => Linking.openURL('https://open.kakao.com/o/sVQUATah')}
        />
        <ProfileEditItem
          title={t('버전')}
          onPress={() =>
            Alert.alert(t('버전 확인'), t('현재 버전은 1.0.0입니다.'), [
              {text: t('확인'), style: 'default'},
            ])
          }
          font={font}
        />
        <ProfileEditItem
          title={t('로그아웃')}
          onPress={() => setModalVisible(true)}
          font={font}
        />
        <CustomModal
          visible={modalVisible}
          title={t('로그아웃')}
          message={t('로그아웃하시겠습니까?')}
          onCancel={() => setModalVisible(false)}
          onConfirm={logout}
        />
      </ListContainer>
    </View>
  );
}

// 설정
const ListContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  margin-top: 20px;
`;
