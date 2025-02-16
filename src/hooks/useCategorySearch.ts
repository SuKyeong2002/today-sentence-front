import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

// 카테고리로 명언 조회 
export const useCategorySearch = (category: string, page = 1, size = 100) => {
  return useQuery(
    ["searchResults", "category", category, page],
    async () => {
      console.log("카테고리로 명언 검색 요청:", { type: "category", category, page, size });

      const response = await apiClient.get("/api/search/posts", {
        params: { type: "category", search: category, page: page - 1, size },
      });

      console.log("검색 결과:", response.data);
      return response.data.data;
    },
    {
      enabled: !!category, 
      retry: false,
      onError: (error) => console.error("명언 검색 오류:", error),
    }
  );
};
