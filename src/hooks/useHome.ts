import { useQuery } from "react-query";
import { fetchHomeData } from "@/api/home";

export const useHome = () => {
  return useQuery(["home"], fetchHomeData, {
    onError: (error) => {
      console.error("홈 데이터 로딩 실패:", error);
    },
  });
};
