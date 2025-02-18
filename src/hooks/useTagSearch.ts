import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useTagSearch = (type: string, query: string, page = 1, size = 100) => {
    return useQuery(
      ["searchResults", type, query, page],
      async () => {
        console.log("검색 요청:", { type, query, page, size });
  
        const response = await apiClient.get("/api/search/hashtags", {
          params: {type, query, page: page - 1, size}
        });
  
        console.log("검색 결과:", response.data);

        return response.data.data; 
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
  