import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용

type RootStackParamList = {
  BookDetail: { book: Book };
};

type BookDetailScreenProps = {
  route: RouteProp<RootStackParamList, "BookDetail">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  hashtags: string[];
  description: string;
}

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverImage }} style={styles.coverImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.category}>{book.category}</Text>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.hashtagContainer}>
          {book.hashtags.map((tag, index) => (
            <Text key={index} style={styles.hashtag}>
              #{tag}
            </Text>
          ))}
        </View>

        <Text style={styles.description}>{book.description}</Text>
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
  description: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 16,
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
});
