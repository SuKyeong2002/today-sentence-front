import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View} from 'react-native';
import CategoryContent from './content/CategoryContent';
import { useTheme } from '@/context/ThemeContext';

export default function CategrySearchPage() {
  const {isDarkMode} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <CustomHeader
        showLogo={true}
      />
      <CategoryContent />
    </View>
  );
}
