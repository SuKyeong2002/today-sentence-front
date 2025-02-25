import { useMutation } from "react-query";
import { postQuote } from "@/api/postQuote";

export const usePostQuote = () => {
  return useMutation(postQuote, {
    onSuccess: () => {
      console.log("명언 글이 성공적으로 기록되었습니다.");
    },
    onError: (error) => {
      console.error("명언 글 기록 실패:", error);
    },
  });
};
