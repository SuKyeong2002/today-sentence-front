import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components';
import Profile from './profile/Profile';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ProfileEditItem from '@/components/Button/ProfileEditItem';

type RootStackParamList = {
  Setting: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

export default function MyPage() {
  const navigation = useNavigation<NavigationProp>();

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
          title="프로필 편집"
          onPress={() => console.log('프로필 편집')}
        />
        <ProfileEditItem
          title="프리미엄"
          onPress={() =>
            Alert.alert(
              '추후기능',
              '오픈 준비 중입니다. 곧 이용하실 수 있어요 :)',
              [{text: '확인', style: 'default'}],
            )
          }
        />
        <ProfileEditItem
          title="커스터마이징"
          onPress={() =>
            Alert.alert(
              '추후기능',
              '오픈 준비 중입니다. 곧 이용하실 수 있어요 :)',
              [{text: '확인', style: 'default'}],
            )
          }
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
