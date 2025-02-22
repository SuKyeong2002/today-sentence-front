import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import RecordContent from "@/components/Record/RecordContent";  
import SavedContent from "@/components/Record/SavedContent";   
import StatsContent from "@/components/Record/StatusContent";    
import { categories } from "@/types/constants";

export default function Record({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState("기록");

  const renderContent = () => {
    switch (activeTab) {
      case "기록":
        return <RecordContent/>;
      case "저장":
        return <SavedContent />;
      case "통계":
        return <StatsContent title="전체 독서 통계" data={categories} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        {[
          { label: "기록", key: "기록" },
          { label: "저장", key: "저장" },
          { label: "통계", key: "통계" },
        ].map(({ label, key }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.tabButton,
              activeTab === key && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(key)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === key && styles.activeTabButtonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>{renderContent()}</View>
      <Footer />
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
});