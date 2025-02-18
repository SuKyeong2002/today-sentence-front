import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 인증 토큰 가져오기 함수
const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      console.warn("저장된 인증 토큰 없음");
      return null;
    }
    return token;
  } catch (error) {
    console.error("토큰 가져오기 실패:", error);
    return null;
  }
};

// 댓글 목록 조회 API
export const fetchComments = async (postId: number) => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
  }

  try {
    const response = await apiClient.get(`/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.comments;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    throw error;
  }
};
