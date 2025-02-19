import { apiClient } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteAccount = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.get("/api/member/withdraw", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error("회원탈퇴 실패:", error);
    throw error;
  }
};
