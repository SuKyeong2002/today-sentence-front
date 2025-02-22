import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { StatsContentProps } from "@/types/CategoryData";

const categories = {
  "시/소설/에세이": 10,
  "경제/경영": 5,
  "역사/사회": 8,
  "철학/심리학": 3,
  "자기계발": 7,
  "예체능": 4,
  "아동/청소년": 6,
  "여행/문화": 2,
  "기타": 1,
};

const COLORS = [
  "#FF6F61", "#FFD700", "#6A5ACD", "#1E90FF", "#32CD32",
  "#FF69B4", "#FF4500", "#DA70D6", "#808080"
];

// 데이터를 변환하는 함수
function transformData(data: Record<string, number>) {
  return Object.keys(categories).map((category) => ({
    category,
    count: data[category] || 0,
  }));
}

const StatsContent: React.FC<StatsContentProps> = ({ title, data }) => {
  const categoryData = transformData(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.itemDetail}>
            <Text style={styles.itemText}>📚 {item.category}</Text>
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
