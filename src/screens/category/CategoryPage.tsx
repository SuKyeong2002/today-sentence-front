import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View} from 'react-native';
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