import { useMutation, useQueryClient } from 'react-query';
import { apiClient } from "@/api/auth"; // API 클라이언트 통합
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LikeResponse {
  success: boolean;
}

export const useLikeToggle = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeResponse, Error, number>(
    async (postId: number) => {
      console.log("좋아요 요청:", { postId });

      if(!postId) {
        console.error("postId가 없습니다");
      }

      const token = await getAccessToken();
      if (!token) {
        console.error('인증 토큰 없음 - 로그인 필요');
        throw new Error('인증 토큰이 없습니다. 로그인해주세요.');
      }

      try {
        const response = await apiClient.post(
          "/api/likes",
          { postId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("좋아요 요청 성공:", response.data);
        return response.data;
      } catch (error) {
        console.error("좋아요 처리 실패:", error);
        throw error;
      }
    },
    {
      onSuccess: (_, postId) => {
        console.log(`좋아요 처리 완료 (postId: ${postId})`);
        queryClient.invalidateQueries(['categoryBookSearch']); // ✅ 자동 UI 업데이트
      },
      onError: (error) => {
        console.error('좋아요 처리 실패:', error.message);
      },
    }
  );
};

// 인증 토큰 가져오는 함수 (401 Unauthorized 방지)
const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken'); // 🔥 로그인 후 저장된 토큰 가져오기
    if (!token) {
      console.warn("저장된 인증 토큰 없음");
      return null;
    }
    return token;
  } catch (error) {
    console.error('토큰 가져오기 실패:', error);
    return null;
  }
};
