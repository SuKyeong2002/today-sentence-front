import axios from "axios";

const BASE_URL = "https://your-backend-url.com/api";

export const sendResetCode = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-reset-code`, { email });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "코드 전송 실패");
    } else {
      throw new Error("코드 전송 실패");
    }
  }
};

export const verifyResetCode = async (email: string, code: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-reset-code`, { email, code });
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "코드 인증 실패");
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      email,
      newPassword,
    });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "비밀번호 재설정 실패");
    } else {
      throw new Error("비밀번호 재설정 실패");
    }
  }
};
