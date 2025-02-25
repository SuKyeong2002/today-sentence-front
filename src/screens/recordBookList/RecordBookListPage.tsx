import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTheme} from '@/context/ThemeContext';
import {useTranslation} from 'react-i18next';
import CustomHeader from '@/components/Header/CustomHeader';
import {useRecordBookList} from '@/hooks/useRecordBookList';
import {useNavigation, NavigationProp} from '@react-navigation/native';

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
};

export default function RecordBookListPage() {
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {data: records, isLoading, error} = useRecordBookList(year, month);

  const filteredRecords = records?.filter(item => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      item.bookTitle.toLowerCase().includes(lowerSearchTerm) ||
      item.bookAuthor.toLowerCase().includes(lowerSearchTerm)
    );
  });

  // useNavigation의 타입을 RootStackParamList로 설정
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 책 클릭 시 BookWrite 페이지로 해당 책 정보 전달
  const handleBookClick = (book: Book) => {
    navigation.navigate('BookWrite', {book}); // book 정보를 BookWrite로 전달
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
      <CustomHeader showLogo={true} />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('검색어를 입력하세요')}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <FlatList
          data={filteredRecords}
          keyExtractor={(item, index) =>
            `${year}-${month}-${item.postId}-${index}`
          }
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleBookClick(item)}>
              <View style={styles.card}>
                <Image source={{uri: item.bookCover}} style={styles.bookCover} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.bookTitle}</Text>
                  <Text style={styles.subtitle}>
                    {`${item.bookAuthor} · ${item.bookPublisher} (${item.bookPublishingYear})`}
                  </Text>
                </View>
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
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
