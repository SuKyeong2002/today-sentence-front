import BackHeader from '@/components/Header/BackHeader';
import {useTheme} from '@/context/ThemeContext';
import {useRecordBookList} from '@/hooks/useRecordBookList';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Book {
  postId: string;
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookPublishingYear: string;
  bookCover: string;
}

type RootStackParamList = {
  BookWrite: {book: Book};
  RecordSearch: undefined;
  RecordBook: undefined;
};

export default function RecordBookListPage() {
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {data: records, isLoading, error} = useRecordBookList(year, month);
  const {isDarkMode, theme} = useTheme();

  const filteredRecords = records?.filter(item => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      item.bookTitle.toLowerCase().includes(lowerSearchTerm) ||
      item.bookAuthor.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBookClick = (book: Book) => {
    // navigation.navigate('RecordBook');
  }; 

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
          {flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'},
        ]}>
        <FlatList
          data={filteredRecords}
          keyExtractor={(item, index) =>
            `${year}-${month}-${item.postId}-${index}`
          }
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleBookClick(item)}>
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFF',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFF',
                  },
                ]}>
                <Image
                  source={{uri: item.bookCover}}
                  style={styles.bookCover}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: isDarkMode ? '#FFF' : '#2B2B2B',
                      },
                    ]}>
                    {item.bookTitle}
                  </Text>
                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color: isDarkMode ? '#FFF' : '#828183',
                      },
                    ]}>
                    {`${item.bookAuthor}`}
                  </Text>
                  <Text
                    style={[
                      styles.subtitle2,
                      {
                        color: isDarkMode ? '#D3D3D3' : '#828183',
                      },
                    ]}>
                    {`${item.bookPublisher} / ${item.bookPublishingYear}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('RecordSearch')}>
          <Image
            source={require('@/assets/image/add_button.png')}
            style={styles.addButtonImage}
          />
        </TouchableOpacity>
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
    fontWeight: 700,
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
  addButton: {
    position: 'absolute', 
    bottom: 20, 
    right: 20,
    width: 60, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
  },
  addButtonImage: {

  },
});
