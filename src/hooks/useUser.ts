import { user } from "@/api/user";
import { QueryClient, useQuery, useQueryClient } from "react-query";

export const useUser = () => {
  const queryClient = useQueryClient();
  
  return useQuery("userProfile", user, {
    onError: (error) => console.error("유저 정보 가져오기 오류:", error),
  });
};

export const refetchUserData = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries('user');
  await queryClient.refetchQueries('user'); 
};
