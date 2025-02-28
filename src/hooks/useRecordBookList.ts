import { useQuery } from "react-query";
import { fetchRecordBookList } from "@/api/recordBookList";

export const useRecordBookList = (year: number, month: number) => {
  return useQuery(
    ["recordBookList", year, month], 
    () => fetchRecordBookList(year, month),
    {
      staleTime: 0, 
      cacheTime: 0, 
      onSuccess: (data) => {
        console.log("최신 기록 목록 로드됨:", data);
      },
      onError: (error) => {
        console.error("기록 목록 로딩 실패:", error);
      },
    }
  );
};
