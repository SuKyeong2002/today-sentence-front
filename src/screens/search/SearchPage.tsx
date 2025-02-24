import CustomHeader from '@/components/Header/CustomHeader';
import React, {useState} from 'react';
import {View} from 'react-native';
import Input from './Input/Input';
import RegistrationTag from './Tag/RegistrationTag';
import InquiryTag from './Tag/InquiryTag';
import {useTheme} from '@/context/ThemeContext';

export default function SearchPage() {
  const [hasResults, setHasResults] = useState(false);
  const {isDarkMode} = useTheme();

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
