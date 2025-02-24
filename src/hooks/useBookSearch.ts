import { apiClient } from "@/api/auth";
import { useInfiniteQuery } from "react-query";


// 책 제목/저자로 명언 조회
export const useBookSearch = (search: string, size:number,sortBy = "like_count") => {
return useInfiniteQuery(
    ["searchResults", "title", search, sortBy],
     async ({ pageParam = 0 }) => {
      console.log("검색 요청:", { type: "title", search,  size });

      const response = await apiClient.get("/api/search/posts", { 
        params: { type: "title", search : search , page: pageParam, size,sortBy}
      });

      console.log("검색 결과:", response.data);
      return response.data.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNextPage ? allPages.length : undefined;
      },
      enabled: !!search, 
      retry: false,
      onError: (error) => console.error("검색 오류:", error),
    }
  );
};
