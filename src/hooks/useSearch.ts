import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useSearch = (type: string, search: string, page = 1, size = 10) => {
    return useQuery(
      ["searchResults", type, search, page],
      async () => {
        console.log("📌 검색 요청:", { type, search, page, size });
  
        const response = await apiClient.get("/api/search/books", {
          params: { type, search, page: page - 1, size },
        });
  
        console.log("✅ 검색 결과:", response.data);
  
        // ✅ `data.data`를 반환해야 올바른 결과 표시 가능
        return response.data.data; 
      },
      {
        enabled: !!search && !!type,
        retry: false,
        onError: (error) => {
          console.error("🔴 검색 오류:", error);
        },
      }
    );
  };
  