import { apiClient } from "@/api/auth";
import { useInfiniteQuery } from "react-query";

export const useTagQuoteSearch = (tag: string, size :number, sortBy = "like_count") => {
  return useInfiniteQuery(
    ["searchResults", "tag", tag, sortBy],
    async ({ pageParam = 0 }) => {
      console.log("태그로 명언 검색 요청:", { type: "tag", tag, pageParam, size });

      const response = await apiClient.get("/api/search/posts", {
        params: { type: "tag", search: tag, sortBy, page: pageParam, size },
      });

      console.log("태그 검색 결과:", response.data.data);
      return response.data.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNextPage ? allPages.length : undefined;
      },
      enabled: !!tag,
      retry: false,
      onError: (error) => console.error("태그 검색 오류:", error),
    }
  );
};
