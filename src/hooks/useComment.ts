import { fetchComments } from "@/api/comment";
import { useQuery } from "react-query";

export const useComments = (postId: number) => {
  return useQuery(["comments", postId], () => fetchComments(postId), {
    onError: (error) => {
      console.error("댓글 로딩 실패:", error);
    },
  });
};
