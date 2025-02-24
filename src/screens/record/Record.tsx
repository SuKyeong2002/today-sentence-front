import CustomHeader from '@/components/Header/CustomHeader';
import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@/context/ThemeContext';
import ListItem from '@/components/Button/ListItem';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  RecordContent: undefined;
  RecordSearch: undefined;
  SavedContent: undefined;
  StatusContent: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function CategrySearchPage() {
  const navigation = useNavigation<NavigationProp>();
  const {isDarkMode} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <CustomHeader showLogo={true} />
      <ListItem
        title={'기록'}
        subtitle={'오늘의 한 줄을 남겨보세요.'}
        imageSource={require('@/assets/image/record_writing.png')}
        onPress={() => navigation.navigate('RecordSearch')}
      />
      <ListItem
        title={'저장'}
        subtitle={'마음에 남은 문장을 간직하세요.'}
        imageSource={require('@/assets/image/record_bookmark.png')}
        onPress={() => navigation.navigate('SavedContent')}
      />
      <ListItem
        title={'통계'}
        subtitle={'기록과 저장을 한눈에 확인하세요.'}
        imageSource={require('@/assets/image/record_stats.png')}
        onPress={() => navigation.navigate('StatusContent')}
      />
    </View>
  );
}
