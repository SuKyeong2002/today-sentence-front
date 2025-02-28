import Sentence from '@/components/Book/Sentence';
import { useTheme } from '@/context/ThemeContext';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFetchBookDetail } from '../../hooks/useFetchBookDetail';
import { RootStackParamList } from '../../types/Book';
import BackHeader from '../Header/BackHeader';
;

type BookDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'BookDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({route}) => {
  const {postId} = route.params;
  const {t} = useTranslation();
  const { isDarkMode, theme } = useTheme();
  const {book, loading, error} = useFetchBookDetail(postId);

  console.log("현재 postId:", postId); 
  console.log("불러온 책 정보:", book);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>저장된 책이 없습니다.</Text>
      </View>
    );
  }

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <View style={[styles.centeredContainer, { backgroundColor: isDarkMode ? '#000000' : 'background' },
          ]}>
        <View style={styles.container}>
          <Sentence post={book.posts} interaction={book.interaction} />
        </View>
      </View>
    </>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'background',
    margin: 20,
  },
  centeredContainer: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
