import { useQuery } from "react-query";
import { fetchFamousTags } from "@/api/famousTags";

export const useFamousTags = () => {
  return useQuery("famousTags", fetchFamousTags, {
    onError: (error) => console.error("인기 태그 로딩 실패:", error),
  });
};
