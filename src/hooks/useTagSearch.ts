import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useTagSearch = (search: string, page = 1, size = 10) => {
  return useQuery(
    ["tagSearchResults", search, page],
    async () => {
      console.log("태그 검색 요청:", { type: "tag", search, page, size });

      if (!search.trim()) {
        throw new Error("검색어를 입력해야 합니다.");
      }

      try {
        const response = await apiClient.get("/api/search/posts", {
          params: {
            type: "tag", 
            search: encodeURIComponent(search), 
            page: Math.max(page - 1, 0),
            size: size || 10,
          },
        });

        console.log("태그 검색 결과:", response.data);
        return response.data.data ?? []; 
      } catch (error) {
        console.error("태그 검색 API 에러:", error);
        throw error;
      }
    },
    {
      enabled: !!search, 
      retry: false,
      onError: (error) => {
        console.error("태그 검색 오류:", error);
      },
    }
  );
};
