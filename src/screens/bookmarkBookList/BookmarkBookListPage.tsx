import CustomHeader from '@/components/Header/CustomHeader';
import {useTheme} from '@/context/ThemeContext';
import {useBookmarkBookList} from '@/hooks/useBookmarkBookList';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/Book';
import BackHeader from '@/components/Header/BackHeader';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BookDetail'
>;

export default function BookmarkBookListPage() {
  const {isDarkMode, theme} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const {data: records, isLoading, error} = useBookmarkBookList(year, month);

  const handleMonthChange = useCallback(
    (direction: any) => {
      let newMonth = month + direction;
      if (newMonth > 12) {
        newMonth = 1;
        setYear(year + 1);
      } else if (newMonth < 1) {
        newMonth = 12;
        setYear(year - 1);
      }
      setMonth(newMonth);
    },
    [month, year],
  );

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
      <BackHeader searchKeyword={t('기록')} />
      <View
        style={[
          styles.container,
          {flex: 1, backgroundColor: isDarkMode ? '#' : 'background'},
        ]}>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => handleMonthChange(-1)}>
            <Text
              style={[
                styles.arrow,
                {
                  color: isDarkMode ? '#FFF' : '#2B2B2B',
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.dateText,
              {
                color: isDarkMode ? '#FFF' : '#2B2B2B',
                fontFamily: theme.fontFamily,
              },
            ]}>{`${year}년 ${month}월`}</Text>
          <TouchableOpacity onPress={() => handleMonthChange(1)}>
            <Text
              style={[
                styles.arrow,
                {
                  color: isDarkMode ? '#FFF' : '#2B2B2B',
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {'>'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={records}
          keyExtractor={(item, index) =>
            `${year}-${month}-${item.postId}-${index}`
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookDetail', {postId: item.postId})
              }
              style={[
                styles.card,
                {
                  backgroundColor: isDarkMode ? '#2B2B2B' : '#FFF',
                  borderColor: isDarkMode ? '#2B2B2B' : '#FFF',
                },
              ]}>
              <Image source={{uri: item.bookCover}} style={styles.bookCover} />
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: isDarkMode ? '#FFF' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    },
                  ]}>
                  {item.bookTitle}
                </Text>
                <Text
                  style={[
                    styles.subtitle2,
                    {
                      color: isDarkMode ? '#D3D3D3' : '#828183',
                      fontFamily: theme.fontFamily,
                    },
                  ]}>
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
});
