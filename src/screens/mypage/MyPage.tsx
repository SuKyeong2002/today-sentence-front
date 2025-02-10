import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components';
import Profile from './profile/Profile';
import Reac, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ProfileEditItem from '@/components/Button/ProfileEditItem';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Setting: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
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
          onPress={() => console.log('프로필 편집')}
          font={font}
        />
        <ProfileEditItem
          title={t('프리미엄')}
          onPress={() =>
            Alert.alert(
              t('추후기능'),
              t('오픈 준비 중입니다. 곧 이용하실 수 있어요 :)'),
              [{text: t('확인'), style: 'default'}],
            )
          }
          font={font}
        />
        <ProfileEditItem
          title={t('커스터마이징')}
          onPress={() =>
            Alert.alert(
              t('추후기능'),
              t('오픈 준비 중입니다. 곧 이용하실 수 있어요 :)'),
              [{text: t('확인'), style: 'default'}],
            )
          }
          font={font}
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

// 편집
const ProfileEditContainer = styled(View)`
  width: 90%;
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`;

const ProfileEditText = styled(Text)`
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

// 이미지
const SettingImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
