import CustomHeader from '@/components/Header/CustomHeader';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from './Input/Input';
import RegistrationTag from './Tag/RegistrationTag';
import InquiryTag from './Tag/InquiryTag';
import {useTheme} from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function SearchPage() {
    const {t} = useTranslation();
    const {isDarkMode} = useTheme();
  const [hasResults, setHasResults] = useState(false);

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <Input onSearchResultChange={setHasResults} />

      {/* 검색 결과가 없을 경우에만 인기 Tag 보임*/}
      {!hasResults && (
        <>
          <RegistrationTag />
          <InquiryTag />
        </>
      )}
    </View>
  );
}