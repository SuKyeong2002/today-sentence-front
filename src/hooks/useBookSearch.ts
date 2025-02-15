import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

// 책 제목/저자로 명언 조회
export const useBookSearch = (search: string, page = 1, size = 10) => {
  return useQuery(
    ["searchResults", "title", search, page], 
    async () => {
      console.log("검색 요청:", { type: "title", search, page, size });

      const response = await apiClient.get("/api/search/posts", { 
        params: { type: "title", search, page: page - 1, size }
      });

      console.log("검색 결과:", response.data);
      return response.data.data;
    },
    {
      enabled: !!search, 
      retry: false,
      onError: (error) => console.error("검색 오류:", error),
    }
  );
};
