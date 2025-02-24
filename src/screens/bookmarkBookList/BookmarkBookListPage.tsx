import CustomHeader from '@/components/Header/CustomHeader';
import { useTheme } from '@/context/ThemeContext';
import { useBookmarkBookList } from '@/hooks/useBookmarkBookList';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function BookmarkBookListPage() {
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const {data: records, isLoading, error} = useBookmarkBookList(year, month);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8A715D" />
      </View>
    );
  }

  if (error || !records) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t('데이터를 불러올 수 없습니다.')}
        </Text>
      </View>
    );
  }

  return (
    <>
      <CustomHeader showLogo={true} />
      <View style={styles.container}>
        <FlatList
          data={records}
          keyExtractor={(item, index) =>
            `${year}-${month}-${item.postId}-${index}`
          }
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={{uri: item.bookCover}} style={styles.bookCover} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.bookTitle}</Text>
                <Text style={styles.subtitle}>
                  {`${item.bookAuthor} · ${item.bookPublisher} (${item.bookPublishingYear})`}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A715D',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bookCover: {
    width: 110,
    height: 150,
    borderRadius: 10,
    marginRight: 32,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
