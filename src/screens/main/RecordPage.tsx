import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TextInput } from "react-native-gesture-handler";
import BookCard from "@/components/bookCard";

export default function RecordPage({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState("기록");

  const renderContent = () => {
    if (activeTab === "기록") {
      return <RecordContent navigation={navigation} />;
    } else if (activeTab === "저장") {
      return <SavedContent />;
    } else if (activeTab === "통계") {
      return <StatsContent />;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        {["기록", "저장", "통계"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.activeTabButtonText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>{renderContent()}</View>
      <Footer />
    </View>
  );
}

function RecordContent({ navigation }: { navigation: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<{ id: string; image: any; title: string; author: string; }[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const data = [
    {
      id: "1",
      image : require("../assets/image/Landing3.png"),
      title: "React Native in Action",
      author: "Nader Dabit",
    },
    {
      id: "2",
      image : require("../assets/image/Landing3.png"),
      title: "Learning React",
      author: "Alex Banks & Eve Porcello",
    },
    {
      id: "3",
      image : require("../assets/image/Landing3.png"),
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const navigateToDetail = (item1: { readingDate: string; category: string; hashtags: string[]; quote: string; }) => {
    navigation.navigate('BookCardDetail', { item1 });
  };

  return (
    <View style={styles.container}>
    {isSearchVisible && (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    )}

    <FlatList
      data={searchQuery.trim() === "" ? [] : filteredData}
      ListEmptyComponent={() =>
        searchQuery.trim() === "" && isSearchVisible ? (
          <Text style={styles.emptyMessage}>검색어를 입력해주세요</Text>
        ) : searchQuery && filteredData.length === 0 ? (
          <Text style={styles.emptyMessage}>검색 결과가 없습니다.</Text>
        ) : null
      }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigateToDetail({ readingDate: '', category: '', hashtags: [], quote: '' })}>
          <BookCard
            imageUrl={item.image}
            title={item.title}
            author={item.author}
          />
        </TouchableOpacity>
      )}
    />

    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => setIsSearchVisible(!isSearchVisible)}
    >
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>
  </View>
  );
}

function SavedContent() {
  return (
    <View>
      <Text style={styles.contentText}>저장 화면입니다.</Text>
    </View>
  );
}

function StatsContent() {
  return (
    <View>
      <Text style={styles.contentText}>통계 화면입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#5A403D",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabButtonText: {
    color: "#5A403D",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  recordContainer: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    alignSelf: "flex-end",
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  recordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
  floatingButton: {
    color : "#8A715D",
    borderRadius: 10,
  },
  floatingButtonText: {
    fontWeight: "bold"
  },
  searchContainer: {
    flex:1,
    padding: 10
  }
});
