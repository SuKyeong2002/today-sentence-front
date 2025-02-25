import BackHeader from '@/components/Header/BackHeader';
import {useTheme} from '@/context/ThemeContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {KAKAO_API_KEY} from '@env';
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
}

// 📌 카카오 API에서 책 데이터 가져오는 함수
const fetchBooksFromKakao = async (query: string): Promise<Book[]> => {
  console.log('📢 KAKAO_API_KEY:', KAKAO_API_KEY);
  console.log(`📢 검색어: ${query}`); 

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

    console.log(`API 응답 상태: ${response.status}`); 

    if (!response.ok) {
      console.error(`API 요청 실패: ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log(`API 응답 데이터:`, JSON.stringify(data, null, 2));

    return data.documents.map((book: any) => ({
      title: book.title,
      authors: book.authors || [],
      publisher: book.publisher || '정보 없음',
      thumbnail: book.thumbnail || '', 
    }));
  } catch (error) {
    console.error('카카오 API 요청 오류:', error);
    return [];
  }
};

export default function RecordSearchPage() {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 입략 시 카카오로 책 조회
  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (query.length > 0) {
      console.log('검색 시작');
      setIsLoading(true);
      const results = await fetchBooksFromKakao(query);
      setBooks(results);
      setIsLoading(false);
    } else {
      setBooks([]);
    }
  };

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'},
        ]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDarkMode ? '#2B2B2B' : 'white',
              color: isDarkMode ? '#FFF' : '#2B2B2B',
              borderColor: isDarkMode ? '#2B2B2B' : 'white',
            },
          ]}
          placeholder={t('책 제목을 입력하세요')}
          placeholderTextColor={isDarkMode ? '#BBB' : '#666'}
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
            <View style={styles.bookContainer}>
              <Image source={{uri: item.thumbnail}} style={styles.bookCover} />
              <View style={styles.textContainer}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.authors.join(', ')}</Text>
                <Text style={styles.bookPublisher}>{item.publisher}</Text>
              </View>
            </View>
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
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  bookCover: {
    width: 50,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  bookPublisher: {
    fontSize: 12,
    color: '#888',
  },
});
