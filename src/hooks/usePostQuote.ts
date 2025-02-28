import { useMutation, useQueryClient } from "react-query";
import { postQuote } from "@/api/postQuote";

export const usePostQuote = () => {
  const queryClient = useQueryClient();

  return useMutation(postQuote, {
    onSuccess: (newPost) => {
      console.log("명언이 성공적으로 기록되었습니다:", newPost);

      // 기존 목록 가져오기
      const previousData = queryClient.getQueryData(["recordBookList"]);
      
      if (!Array.isArray(previousData)) {
        console.warn("🗂 기존 기록 리스트가 배열이 아님:", previousData);
        return;
      }

      // 새로운 데이터 추가 (postId 없이도 추가 가능하도록 설정)
      const updatedData = [...previousData, { ...newPost, postId: Date.now() }]; 
      queryClient.setQueryData(["recordBookList"], updatedData);
      queryClient.invalidateQueries(["recordBookList"]);
    },
    onError: (error) => {
      console.error("🚨 명언 글 기록 실패:", error);
    },
  });
};
