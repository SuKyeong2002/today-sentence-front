import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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

function StatsContent({ title, data }) {
  const [selectedDate, setSelectedDate] = useState("");

  const categoryData = categories.map((category) => ({
    category,
    count: data.filter((item: any) => item.category === category).length,
  }));

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
        data={data.filter((item:any) => item.date === selectedDate)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemDetail}>
            <Text>카테고리: {item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function StatusContent() {
  const [readBooks, setReadBooks] = useState([]);
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetch("api/posts/statistics")
      .then((response) => response.json())
      .then((data) => {
        setReadBooks(data.readBooks || []);
        setSavedQuotes(data.savedQuotes || []);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  return (
    <View>
      <StatsContent title="내가 읽은 책 통계" data={readBooks} />
      <StatsContent title="내가 저장한 명언 통계" data={savedQuotes} />
    </View>
  );
}

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
