import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useTagQuoteSearch = (tag: string, page = 1, size = 100) => {
  return useQuery(
    ["searchResults", "tag", tag, page],
    async () => {
      console.log("태그로 명언 검색 요청:", { type: "tag", tag, page, size });

      const response = await apiClient.get("/api/search/posts", {
        params: { type: "tag", search: tag, page: page - 1, size },
      });

      console.log("태그 검색 결과:", response.data.data);
      return response.data;
    },
    {
      enabled: !!tag, 
      retry: false,
      onError: (error) => console.error("태그 검색 오류:", error),
    }
  );
};
