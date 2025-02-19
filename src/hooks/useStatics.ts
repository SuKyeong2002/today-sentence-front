import { useState, useEffect } from "react";
import { Statistics } from "../types/CategoryData";
import { fetchStatistics } from "../api/record";

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics>({ records: {}, bookmarks: {} });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getStatistics() {
      try {
        const stats = await fetchStatistics();
        setStatistics(stats);
      } catch (err: any) {
        setError(err.message);
      }
    }

    getStatistics();
  }, []);

  return { statistics, error };
}