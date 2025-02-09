import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View} from 'react-native';
import Input from './Input/Input';
import RegistrationTag from './Tag/RegistrationTag';
import InquiryTag from './Tag/InquiryTag';

export default function SearchPage() {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <Input />
      <RegistrationTag />
      <InquiryTag />
    </View>
  );
}
