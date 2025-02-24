import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// 기록/저장한 명언 통계 
export const fetchStatistics = async () => {
  const token = await getAccessToken();
  if (!token) throw new Error("인증 토큰이 없습니다. 로그인해주세요.");

  try {
    const response = await apiClient.get("/api/posts/statistics", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("통계 데이터 로드 성공:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("통계 데이터 로드 실패:", error);
    throw error;
  }
};
