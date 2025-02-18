import { postComment } from "@/api/commentMutation";
import { useMutation, useQueryClient } from "react-query";

export const useCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation((content: string) => postComment(postId, content), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
    },
  });
};
