import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSearchBooks } from '../../hooks/useSearchBook';
import { Book, RootStackParamList } from '../../types/Book';

export default function RecordSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { searchQuery, searchResults, loading, error, handleSearch, setSearchQuery } = useSearchBooks();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="책 제목을 검색하세요"
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('BookWrite', { book: item })}
          >
            <Image source={{ uri: item.coverUrl }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.bookTitle}</Text>
              <Text style={styles.bookAuthor}>저자: {item.author}</Text>
              <Text style={styles.bookPublisher}>출판사: {item.publisher}</Text>
              <Text style={styles.bookYear}>출판 연도: {item.publishingYear}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  bookItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginVertical: 5,
    borderRadius: 8,
  },
  bookCover: {
    width: 50,
    height: 70,
    borderRadius: 4,
  },
  bookInfo: {
    marginLeft: 10,
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
  },
  bookPublisher: {
    fontSize: 14,
    color: "#666",
  },
  bookYear: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
