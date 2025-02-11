import {View} from 'react-native';
import styled from 'styled-components';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ToggleSettingItem} from '@/components/Button/ToggleSettingItem';
import {ProfileBackHeader} from '@/components/Header/ProfileBackHeader';

export default function SettingPage() {
  const {t} = useTranslation();

  const [isNewsEnabled, setIsNewsEnabled] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isRandomQuoteEnabled, setIsRandomQuoteEnabled] = useState(false);

  return (
    <View style={{flex: 1}}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log(t('뒤로 가기 버튼 클릭됨!'))}
        onNotificationPress={() => console.log(t('알림 버튼 클릭됨!'))}
      />

      <ToggleContainer>
        <ToggleSettingItem
          title={t('좋아요 소식 받기')}
          value={isNewsEnabled}
          onToggle={() => setIsNewsEnabled(prev => !prev)}
        />
        <ToggleSettingItem
          title={t('댓글 소식 받기')}
          value={isNotificationEnabled}
          onToggle={() => setIsNotificationEnabled(prev => !prev)}
        />
        <ToggleSettingItem
          title={t('매일 랜덤 명언 소식 받기')}
          value={isRandomQuoteEnabled}
          onToggle={() => setIsRandomQuoteEnabled(prev => !prev)}
        />
      </ToggleContainer>
    </View>
  );
}

const ToggleContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 20px;
`;
