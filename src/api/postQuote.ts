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

export const postQuote = async (quoteData: {
  bookTitle: string;
  bookAuthor: string;
  bookPublisher: string;
  bookPublishingYear: number;
  bookCover: string;
  isbn: string;
  category: string;
  hashtags: string[];
  content: string;
}) => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
  }

  try {
    const response = await apiClient.post(
      "/api/posts",
      { ...quoteData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("명언 기록 실패:", error?.response?.data?.message || error);
    throw new Error(error?.response?.data?.message || "명언 기록에 실패했습니다.");
  }
};
