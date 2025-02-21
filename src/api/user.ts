import { apiClient, refreshAccessToken } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  email: string;
  nickname: string;
  statusMessage: string;
  profileImg: string;
}

// 유저 정보 조회 
export const user = async ():Promise<UserData|null> => {
  try {
    let token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      console.warn("액세스 토큰이 없습니다.");
      return null;
    }

    console.log("현재 액세스 토큰:", token);

    const response = await apiClient.get("/api/member", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("유저 정보 조회 성공:", response.data);

    return response.data.data || null;
  } catch (error: any) {
    console.error("유저 정보 조회 실패:", error.response?.data || error.message);

    if (error.response?.status === 401 || 404) {
      console.warn("토큰 문제 발생! 자동 재발급 시도중...");

      const newTokens = await refreshAccessToken();
      if (newTokens?.accessToken) {
        console.log("새 액세스 토큰 발급 성공! 다시 요청 중...");

        await AsyncStorage.setItem("accessToken", newTokens.accessToken);

        return await user();
      } else {
        console.warn("토큰 갱신 실패! 로그아웃 필요");
        await AsyncStorage.removeItem("accessToken");
        return null;
      }
    }

    return null;
  }
};
