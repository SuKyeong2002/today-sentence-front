import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RecordPage() {
  const [activeTab, setActiveTab] = useState("기록"); 

  const renderContent = () => {
    if (activeTab === "기록") {
      return <RecordContent />;
    } else if (activeTab === "저장") {
      return <SavedContent />;
    } else if (activeTab === "통계") {
      return <StatsContent />;
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

function RecordContent() {
  return (
    <View>
      <Text style={styles.contentText}>기록 화면입니다.</Text>
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
  contentText: {
    fontSize: 16,
    color: "#333",
  },
});
