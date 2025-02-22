import { useState, useEffect } from "react";

interface StatisticsData {
  records: Record<string, number>;
  bookmarks: Record<string, number>;
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/posts/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStatistics(data.data); // 서버에서 받아온 data.data를 설정
      } catch (err) {
        setError("통계 조회 실패");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { statistics, isLoading, error };
}
