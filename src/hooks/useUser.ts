import { user } from "@/api/user";
import { useQuery } from "react-query";

export const useUser = () => {
  return useQuery("userProfile", user, {
    onError: (error) => console.error("유저 정보 가져오기 오류:", error),
  });
};
