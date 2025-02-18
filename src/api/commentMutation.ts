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

// 댓글 등록 API
export const postComment = async (postId: number, content: string) => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
  }

  try {
    await apiClient.post(`/posts/${postId}/comments`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    throw error;
  }
};
