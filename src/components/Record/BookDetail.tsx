import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import { useFetchBookDetail } from '../../hooks/useFetchBookDetail';
import { RootStackParamList } from '../../types/Book';

type BookDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'BookDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;
  const { book, loading, error } = useFetchBookDetail(postId);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!book) {
    return <Text style={styles.errorText}>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.bookCover }} style={styles.coverImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.category}>{book.category}</Text>
        <Text style={styles.title}>{book.bookTitle}</Text>
        <Text style={styles.author}>{book.bookAuthor}</Text>

        <View style={styles.hashtagContainer}>
          {book.hashtags.map((tag, index) => (
            <Text key={index} style={styles.hashtag}>
              #{tag}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="heart-outline" size={24} color="red" />
          <Text style={styles.buttonText}>공감</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.buttonText}>댓글</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="bookmark-outline" size={24} color="black" />
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="share-social-outline" size={24} color="black" />
          <Text style={styles.buttonText}>공유</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  coverImage: {
    width: 150,
    height: 220,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  category: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  hashtagContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  hashtag: {
    fontSize: 14,
    color: "#007AFF",
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
