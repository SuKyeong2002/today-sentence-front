import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { StatsContentProps } from "@/types/CategoryData";

const categories = [
  "시/소설/에세이",
  "경제/경영",
  "역사/사회",
  "철학/심리학",
  "자기계발",
  "예체능",
  "아동/청소년",
  "여행/문화",
  "기타",
];

const COLORS = [
  "#FF6F61", "#FFD700", "#6A5ACD", "#1E90FF", "#32CD32",
  "#FF69B4", "#FF4500", "#DA70D6", "#808080"
];

function transformData(data: Record<string, number>) {
  return categories.map((category, index) => ({
    category,
    count: data[category.replace(/[^\w]/g, "_").toUpperCase()] || 0,
  }));
}

const StatsContent: React.FC<StatsContentProps> = ({ title, data }) => {
  const categoryData = transformData(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <PieChart width={300} height={300}>
          <Pie
            data={categoryData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => (value > 0 ? `${name} (${value})` : "")}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </View>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.itemDetail}>
            <Text>카테고리: {item.category}</Text>
            <Text>카운트: {item.count}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 320,
    marginBottom: 20,
  },
  chartContainer: {
    paddingTop: 20,
    width: 350,
    height: 280,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  itemDetail: {
    flex: 1,
    padding: 20,
  },
});

export default StatsContent;