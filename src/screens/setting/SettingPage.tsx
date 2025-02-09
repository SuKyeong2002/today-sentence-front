import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import React from 'react';
import BackHeader from '@/components/Header/BackHeader';
import {SettingItem} from '@/components/Button/SettingItem';
import ProfileEditItem from '@/components/Button/ProfileEditItem';

export default function SettingPage() {
  return (
    <View style={{flex: 1}}>
      <BackHeader
        searchKeyword="설정"
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ListContainer>
        <SettingItem
          title="프로필"
          iconSource={require('@/assets/image/settingProfileUser.png')}
          onPress={() => console.log('프로필')}
        />
        <SettingItem
          title="계정"
          iconSource={require('@/assets/image/accountUser.png')}
          onPress={() => console.log('계정')}
        />
        <SettingItem
          title="화면"
          iconSource={require('@/assets/image/screen.png')}
          onPress={() => console.log('화면')}
        />
        <SettingItem
          title="알림"
          iconSource={require('@/assets/image/notification.png')}
          onPress={() => console.log('알림')}
        />
        <SettingItem
          title="공지사항"
          iconSource={require('@/assets/image/news.png')}
          onPress={() => console.log('공지사항')}
        />
        <SettingItem
          title="문의하기"
          iconSource={require('@/assets/image/qa.png')}
          onPress={() => console.log('문의하기')}
        />
        <SettingItem
          title="개발자 응원하기"
          iconSource={require('@/assets/image/good.png')}
          onPress={() => console.log('개발자 응원하기')}
        />
        <ProfileEditItem title="버전" onPress={() => console.log('버전')} />
        <ProfileEditItem title="로그아웃" onPress={() => console.log('로그아웃')} />
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
