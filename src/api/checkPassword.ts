import axios from "axios";

const BASE_URL = "http://43.201.20.84/api/member"; // 백엔드 URL

export const checkPassword = async (username: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/checkPassword`, { username });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "API 요청 중 오류 발생");
    } else {
      throw new Error("API 요청 중 오류 발생");
    }
  }
};
