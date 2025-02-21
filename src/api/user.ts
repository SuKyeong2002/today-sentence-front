import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 유저 정보 조회 
export const user = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      console.warn("액세스 토큰이 없습니다.");
      return null; 
    }

    console.log("저장된 액세스 토큰:", token);

    const response = await apiClient.get("/api/member", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("유저 정보 응답:", response.data);

    if (!response.data || !response.data.data) {
      console.warn("유저 데이터가 없습니다.");
      return null; 
    }

    return response.data.data; 
  } catch (error: any) {
    console.error("유저 정보 조회 실패:", error.response?.data || error.message);

    // 404 오류 처리
    if (error.response?.status === 404) {
      console.warn("유저 데이터가 없습니다.");
      return null;
    }

    // 401 오류 (토큰 만료) → 자동 로그아웃 유도 가능
    if (error.response?.status === 401) {
      console.warn("토큰이 만료되었습니다.");
      await AsyncStorage.removeItem("accessToken");
      return null;
    }

    return null;
  }
};
