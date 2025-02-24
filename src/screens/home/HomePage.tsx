import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View} from 'react-native';
import Content from './content/Content';
import Title from './title/Title';
import {useTheme} from '@/context/ThemeContext';

export default function HomePage() {
  const {isDarkMode} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <CustomHeader showLogo={true} />
      <Title />
      <Content />
    </View>
  );
}
