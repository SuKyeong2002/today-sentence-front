import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useTagSearch = (type: string, query: string, page = 1, size = 10) => {
    return useQuery(
      ["searchResults", type, query, page],
      async () => {
        console.log("검색 요청:", { type, query, page, size });
  
        const response = await apiClient.get("/api/search/hashtags", {
          // params: { type, search, page: page - 1, size },
          params: {type, query, page: page - 1, size}
        });
  
        console.log("검색 결과:", response.data);

        return response.data; 
      },
      {
        enabled: !!query && !!type,
        retry: false,
        onError: (error) => {
          console.error("검색 오류:", error);
        },
      }
    );
  };
  