import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  coverImage: string;
}

type RootStackParamList = {
  BookWrite: { book: Book };
};

export default function RecordSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // ✅ 타입 적용
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) return;

    try {
      const response = await axios.get<{ data: Book[] }>(
        `https://your-api.com/search?q=${query}`
      );
      setSearchResults(response.data.data); 
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="책 제목을 검색하세요"
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate("BookWrite", { book: item })} 
          >
            <Image source={{ uri: item.coverImage }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
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
});
