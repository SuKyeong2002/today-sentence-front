import React from "react";
import { View, Text } from "react-native";
import { useStatistics } from "../../hooks/useStatics";
import StatsContent from "../../components/Record/StatusContent";

const Chart: React.FC = () => {
  const { statistics, error } = useStatistics();

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <StatsContent title="내가 읽은 책 통계" data={statistics.records} />
      <StatsContent title="내가 저장한 명언 통계" data={statistics.bookmarks} />
    </View>
  );
};

export default Chart; 