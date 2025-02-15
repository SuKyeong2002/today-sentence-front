import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useLike = (postId: number) => {
    return useQuery(
      ["searchResults", postId],
      async () => {
        console.log("검색 요청:", { postId });
  
        const response = await apiClient.post("/api/likes", {
          params: { postId },
        });
  
        console.log("검색 결과:", response.data);

        return response.data; 
      },
      {
        retry: false,
        onError: (error) => {
          console.error("검색 오류:", error);
        },
      }
    );
  };
