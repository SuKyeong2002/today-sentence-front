import { apiClient } from "@/api/auth";
import { useInfiniteQuery } from "react-query";

// 카테고리로 명언 조회 
export const useCategorySearch = (category: string, size: number, sortBy: string) => {
  return useInfiniteQuery(
    ["searchResults", "category", category, sortBy],
    async ({ pageParam = 0 }) => {
      console.log("카테고리로 명언 검색 요청:", { category, page: pageParam, size, sortBy });

     const response = await apiClient.get("/api/search/posts", {
             params: { type: "category", search: category, sortBy, page: pageParam, size },
           });

     console.log("검색 결과:", response.data.data);
      return response.data.data;
    },
    {
    getNextPageParam: (lastPage, allPages) => {
       return lastPage.hasNextPage ? allPages.length : undefined;
    }
   ,
      enabled: !!category,
      retry: false,
      onError: (error) => console.error("명언 검색 오류:", error),
    }
  );
};
