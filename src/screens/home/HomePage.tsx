import React from 'react';
import {View} from 'react-native';
import CustomHeader from '@/components/Header/CustomHeader';
import Title from './title/Title';
import Content from './content/Content';
import EmptyContent from './content/EmptyContent';

export default function HomePage() {
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        showLogo={true}
        onNotificationPress={() => console.log('Notification clicked!')}
      />
      <Title />
      
      <Content />
      {/*
      <EmptyContent />
      */}
      
    </View>
  );
}
