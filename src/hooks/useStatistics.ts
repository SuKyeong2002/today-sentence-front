import { useQuery } from "react-query";
import { fetchStatistics } from "@/api/statistics";

export const useStatistics = () => {
  return useQuery("statistics", fetchStatistics, {
    onError: (error) => console.error("통계 데이터 로딩 실패:", error),
  });
};
