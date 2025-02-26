import ListItem from '@/components/Button/ListItem';
import CustomHeader from '@/components/Header/CustomHeader';
import { useTheme } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSourcePropType, View } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  RecordBookList: undefined;
  BookmarkBookList: undefined;
  StatusContent: undefined;
  BookDetail: { postId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function CategrySearchPage() {
  const navigation = useNavigation<NavigationProp>();
  const { t, i18n } = useTranslation();
  const {isDarkMode} = useTheme();
  const [recordImage, setRecordImage] = useState<ImageSourcePropType>(
    require('@/assets/image/record_writing.png'),
  );
  const [bookmarkImage, setBookmarkImage] = useState<ImageSourcePropType>(
    require('@/assets/image/record_bookmark.png'),
  );
  const [statsImage, setStatsImage] = useState<ImageSourcePropType>(
    require('@/assets/image/record_stats.png'),
  );

  useEffect(() => {
    setRecordImage(
      isDarkMode
        ? require('@/assets/image/dark_record_writing.png')
        : require('@/assets/image/record_writing.png'),
    );
    setBookmarkImage(
      isDarkMode
        ? require('@/assets/image/dark_record_bookmark.png')
        : require('@/assets/image/record_bookmark.png'),
    );
    setStatsImage(
      isDarkMode
        ? require('@/assets/image/dark_record_stats.png')
        : require('@/assets/image/record_stats.png'),
    );
  }, [isDarkMode]);

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <CustomHeader showLogo={true} />
      <ListItem
        title={t('기록')}
        subtitle={t('오늘의 한 줄을 남겨보세요.')}
        imageSource={recordImage}
        onPress={() => navigation.navigate('RecordBookList')}
      />
      <ListItem
        title={t('저장')}
        subtitle={t('마음에 남은 문장을 간직하세요.')}
        imageSource={bookmarkImage}
        onPress={() => navigation.navigate('BookmarkBookList')}
      />
      <ListItem
        title={t('통계')}
        subtitle={t('기록과 저장을 한눈에 확인하세요.')}
        imageSource={statsImage}
        onPress={() => navigation.navigate('StatusContent')}
      />
    </View>
  );
}
