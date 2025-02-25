import BackHeader from '@/components/Header/BackHeader';
import {useTheme} from '@/context/ThemeContext';
import {KAKAO_API_KEY} from '@env';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
  title: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  isbn: string;
  bookPublishingYear: number;
}

const fetchBooksFromKakao = async (query: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.documents.map((book: any) => ({
      title: book.title || '정보 없음',
      authors: book.authors.length > 0 ? book.authors : ['정보 없음'],
      publisher: book.publisher || '정보 없음',
      thumbnail: book.thumbnail || '',
      isbn: book.isbn13 || book.isbn10 || '정보 없음',
      bookPublishingYear: book.datetime
        ? new Date(book.datetime).getFullYear()
        : 0,
    }));
  } catch (error) {
    console.error('카카오 API 요청 오류:', error);
    return [];
  }
};

type RootStackParamList = {
  RecordWriter: {bookData: Book};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'RecordWriter'>;

export default function RecordSearchPage() {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (query.length > 0) {
      setIsLoading(true);
      const results = await fetchBooksFromKakao(query);
      setBooks(results);
      setIsLoading(false);
    } else {
      setBooks([]);
    }
  };

  const handleBookSelect = (book: Book) => {
    navigation.navigate('RecordWriter', {bookData: book});
  };

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? '#000000' : '#F5F4F5',
          },
        ]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
              borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
              color: isDarkMode ? 'white' : '#2B2B2B'
            },
          ]}
          placeholder={t('책 제목을 입력해주세요.')}
          placeholderTextColor={isDarkMode ? '#FFFFFF' : '#828183'}
          value={searchTerm}
          onChangeText={handleSearch}
        />

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#8A715D"
            style={{marginTop: 20}}
          />
        )}

        <FlatList
          data={books}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleBookSelect(item)}>
              <View
                style={[
                  styles.bookContainer,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : 'white',
                  },
                ]}>
                <Image
                  source={{uri: item.thumbnail}}
                  style={styles.bookCover}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.bookTitle,
                      {
                        color: isDarkMode ? 'white' : '#2B2B2B',
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.bookAuthor,
                      {
                        color: isDarkMode ? 'white' : '#2B2B2B',
                      },
                    ]}>
                    {item.authors.join(', ')}
                  </Text>
                  <Text
                    style={[
                      styles.bookPublisher,
                      {
                        color: isDarkMode ? '#D3D3D3' : '#2B2B2B',
                      },
                    ]}>
                    {item.publisher}
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

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  bookCover: {
    width: 90,
    height: 130,
    marginRight: 32,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 10,
  },
  bookPublisher: {
    fontSize: 12,
  },
});
