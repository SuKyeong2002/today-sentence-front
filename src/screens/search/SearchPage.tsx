import CustomHeader from '@/components/Header/CustomHeader';
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from './Input/Input';
import RegistrationTag from './Tag/RegistrationTag';
import InquiryTag from './Tag/InquiryTag';

export default function SearchPage() {
  const [hasResults, setHasResults] = useState(false); 

  return (
    <View style={{ flex: 1 }}>
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
