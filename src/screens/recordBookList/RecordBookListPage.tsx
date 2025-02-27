import BackHeader from '@/components/Header/BackHeader';
import { useTheme } from '@/context/ThemeContext';
import { useRecordBookList } from '@/hooks/useRecordBookList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BookDetail'
>;

interface Book {
  postId: string;
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookPublishingYear: string;
  bookCover: string;
}

type RootStackParamList = {
  BookWrite: { book: Book };
  RecordSearch: undefined;
  RecordBook: undefined;
  BookDetail: { postId: string };
};

export default function RecordBookListPage() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: recordBookList, isLoading, error } = useRecordBookList(year, month);
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  // 월 변경 핸들러
  const handleMonthChange = useCallback(
    (direction: number) => {
      let newMonth = month + direction;
      let newYear = year;

      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      } else if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      setYear(newYear);
      setMonth(newMonth);
    },
    [month, year]
  );

  // 데이터 로딩 중
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8A715D" />
      </View>
    );
  }

  // API 에러 발생 시
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('데이터를 불러올 수 없습니다.')}</Text>
      </View>
    );
  }

  
  // 데이터가 없을 경우
  if (!recordBookList || recordBookList.length === 0) {
    return (
      <>
        <BackHeader searchKeyword={t('기록')} />
        <View
          style={[
            styles.container,
            { flex: 1, backgroundColor: isDarkMode ? '#000000' : 'background' },
          ]}
        >
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={() => handleMonthChange(-1)}>
              <Text style={[styles.arrow, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={[styles.dateText, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>
              {`${year}년 ${month}월`}
            </Text>
            <TouchableOpacity onPress={() => handleMonthChange(1)}>
              <Text style={[styles.arrow, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{t('검색 결과가 없습니다.')}</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <View
        style={[
          styles.container,
          { flex: 1, backgroundColor: isDarkMode ? '#000000' : 'background' },
        ]}
      >
        {/* 🔹 월 변경 버튼 */}
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => handleMonthChange(-1)}>
            <Text style={[styles.arrow, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={[styles.dateText, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>
            {`${year}년 ${month}월`}
          </Text>
          <TouchableOpacity onPress={() => handleMonthChange(1)}>
            <Text style={[styles.arrow, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>{'>'}</Text>
          </TouchableOpacity>
        </View>
          <FlatList
            data={recordBookList}
            keyExtractor={(item, index) =>
              `${year}-${month}-${item.postId}-${index}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookDetail', { postId: item.postId })
                }
                style={[
                  styles.card,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFF',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFF',
                  },
                ]}
              >
                <Image source={{ uri: item.bookCover }} style={styles.bookCover} />
                <View style={styles.textContainer}>
                  <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#2B2B2B' }]}>
                    {item.bookTitle}
                  </Text>
                  <Text style={[styles.subtitle, { color: isDarkMode ? '#FFF' : '#828183' }]}>
                    {`${item.bookAuthor}`}
                  </Text>
                  <Text style={[styles.subtitle2, { color: isDarkMode ? '#D3D3D3' : '#828183' }]}>
                    {`${item.bookPublisher} / ${item.bookPublishingYear}`}
                  </Text>
                </View>
              </TouchableOpacity>
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
    fontWeight: '600',
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bookCover: {
    width: 90,
    height: 130,
    borderRadius: 10,
    marginRight: 32,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle2: {
    fontSize: 14,
    marginBottom: 5,
  },
  // no data
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
});
