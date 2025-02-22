import { apiClient } from "@/api/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// 인증 토큰 가져오기 함수
const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
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

// 오늘의 명언 조회 API 요청
export const fetchHomeData = async () => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인해주세요.');
  }

  try {
    const response = await apiClient.get("/api/posts/today-sentence", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("홈 데이터 불러오기 실패:", error);
    throw error;
  }
};
