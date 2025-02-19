import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { useFetchBookmarks } from '../../hooks/useFetchBookmarks';
import { Bookmark } from '../../types/Bookmark';

const BookmarksScreen: React.FC = () => {
  const { bookmarks, loading, error } = useFetchBookmarks();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem = ({ item }: { item: Bookmark }) => (
    <TouchableOpacity style={styles.bookmarkContainer}>
      <Image source={{ uri: item.bookCover }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.bookTitle}</Text>
        <Text style={styles.bookAuthor}>저자: {item.bookAuthor}</Text>
        <Text style={styles.bookPublisher}>출판사: {item.bookPublisher}</Text>
        <Text style={styles.bookYear}>출판 연도: {item.bookPublishingYear}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.postId.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  bookmarkContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  bookCover: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 2,
  },
  bookPublisher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bookYear: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookmarksScreen;
