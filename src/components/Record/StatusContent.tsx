import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useStatistics } from "@/hooks/useStatistics"; // hook 가져오기

const COLORS = [
  "#FF6F61", "#FFD700", "#6A5ACD", "#1E90FF", "#32CD32",
  "#FF69B4", "#FF4500", "#DA70D6", "#808080"
];

function transformData(data: Record<string, number>, categoryType: string) {
  return Object.keys(data).map((category) => ({
    category,
    count: data[category] || 0,
    type: categoryType,
  }));
}


const StatsContent = () => {
  const { statistics, isLoading, error } = useStatistics(); // hook 사용
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    if (statistics) {
      // records와 bookmarks 데이터를 각각 변환하여 categoryData로 설정
      const recordsData = transformData(statistics.records, "records");
      const bookmarksData = transformData(statistics.bookmarks, "bookmarks");

      // 두 데이터를 합침
      setCategoryData([...recordsData, ...bookmarksData]);
    }
  }, [statistics]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart width={320} height={320}>
          <Pie
            data={categoryData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            label={({ name, value }) => (value > 0 ? `${name} (${value})` : "")}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </View>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => `${item.category}-${item.type}`}
        renderItem={({ item }) => (
          <View style={styles.itemDetail}>
            <Text style={styles.itemText}>
              {item.type === "records" ? "📚" : "🔖"} {item.category}
            </Text>
            <Text style={styles.countText}>{item.count}권</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  itemDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A403D",
  },
});

export default StatsContent;
