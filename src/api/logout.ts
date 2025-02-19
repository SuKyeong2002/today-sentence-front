import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken"); 

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.delete("/api/member/sign-out", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
