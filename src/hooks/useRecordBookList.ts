import { useQuery } from "react-query";
import { fetchRecordBookList } from "@/api/recordBookList";

export const useRecordBookList = (year: number, month: number) => {
  return useQuery(
    ["recordBookList", year, month], 
    () => fetchRecordBookList(year, month),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        console.log("기록 명언 목록 성공적으로 로드됨:", data);
      },
      onError: (error) => {
        console.error("기록 명언 목록 로딩 실패:", error);
      },
    }
  );
};
