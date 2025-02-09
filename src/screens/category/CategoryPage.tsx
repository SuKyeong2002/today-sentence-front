import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components';
import CategoryContent from './content/CategoryContent';

export default function CategrySearchPage() {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <CategoryContent />
    </View>
  );
}