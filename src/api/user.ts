import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 유저 정보 조회 API
export const user = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.get("/api/member", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    throw error;
  }
};
