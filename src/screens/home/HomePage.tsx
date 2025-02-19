import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import { View } from 'react-native';
import Content from './content/Content';
import Title from './title/Title';

export default function HomePage() {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <Title />
      <Content />
    </View>
  );
}
