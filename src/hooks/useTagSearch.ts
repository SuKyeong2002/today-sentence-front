import { apiClient } from "@/api/auth";
import { useQuery } from "react-query";

export const useTagSearch = (search: string, page = 1, size = 10) => {
  return useQuery(
    ["tagSearchResults", search, page],
    async () => {
      console.log("📌 태그 검색 요청:", { type: "tag", search, page, size });

      // ✅ 백엔드 요청 시 파라미터 검증
      if (!search.trim()) {
        throw new Error("검색어를 입력해야 합니다.");
      }

      try {
        const response = await apiClient.get("/api/search/posts", {
          params: {
            type: "tag", // ✅ 태그 검색이므로 type 고정
            search: encodeURIComponent(search), // ✅ 검색어를 URL 인코딩 처리
            page: Math.max(page - 1, 0), // ✅ 백엔드는 페이지를 0부터 시작할 가능성이 있음
            size: size || 10, // ✅ 기본값 설정
          },
        });

        console.log("✅ 태그 검색 결과:", response.data);
        return response.data.data ?? []; // ✅ 데이터가 없으면 빈 배열 반환
      } catch (error) {
        console.error("🔴 태그 검색 API 에러:", error);
        throw error;
      }
    },
    {
      enabled: !!search, // ✅ 검색어가 있을 때만 실행
      retry: false, // ✅ 불필요한 재시도 방지
      onError: (error) => {
        console.error("🔴 태그 검색 오류:", error);
      },
    }
  );
};
