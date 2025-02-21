import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const API_URL = 'http://3.36.71.224';

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const signUpUser = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/member/sign-up`,
    {username, password},
  );
  return response.data;
};

export const signInUser = async (
  email?: string,
  password?: string,
  refreshToken?: string
): Promise<AuthResponse | null> => {
  try {
    const deviceId = await AsyncStorage.getItem('deviceId') || await DeviceInfo.getUniqueId();
    await AsyncStorage.setItem('deviceId', deviceId);

    const isRefreshLogin = !!refreshToken;
    const requestData = isRefreshLogin ? {} : { email, password };

    if (!isRefreshLogin && (!email || !password)) {
      console.warn("🚨 이메일 또는 비밀번호가 없습니다.");
      return null;
    }

    const response = await axios.post(
      `${API_URL}/api/member/sign-in`, 
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Device-Id': deviceId,
          ...(isRefreshLogin && { 'Authorization': `Bearer ${refreshToken}` }) 
        },
      },
    );

    if (!response.headers['access-token'] || !response.headers['refresh-token']) {
      console.error("서버 응답에 토큰이 없습니다.");
      return null;
    }

    // console.log('로그인 성공! 5분 후 액세스 토큰 자동 검증 시작...');
    // startTokenRefreshTimer(); 

    console.log('ACCESS-TOKEN:', response.headers['access-token']);
    console.log('REFRESH-TOKEN:', response.headers['refresh-token']);

    await AsyncStorage.setItem('accessToken', response.headers['access-token']);
    await AsyncStorage.setItem('refreshToken', response.headers['refresh-token']);

    return {
      accessToken: response.headers['access-token'],
      refreshToken: response.headers['refresh-token'],
    };
  } catch (error: any) {
    console.error("로그인 및 토큰 갱신 실패:", error.response?.status, error.response?.data);
    return null;
  }
};

// 액세스 토큰 만료 시 자동으로 리프레시 토큰을 사용하여 재발급
export const refreshAccessToken = async (): Promise<AuthResponse | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.warn("리프레시 토큰이 없습니다. 재로그인 필요.");
      return null;
    }

    return await signInUser(undefined, undefined, refreshToken);
  } catch (error: any) {
    console.error("액세스 토큰 재발급 실패:", error.response?.status, error.response?.data);
    return null;
  }
};

// 로그인 성공 시 5분 후 자동 실행되는 토큰 검증 및 갱신
const startTokenRefreshTimer = () => {
  console.log("⏳ 5분 후 액세스 토큰 자동 검증 및 갱신 테스트 시작...");
  setTimeout(async () => {
    const newTokens = await refreshAccessToken();

    if (newTokens?.accessToken) {
      console.log("새롭게 받은 ACCESS-TOKEN:", newTokens.accessToken);
    } else {
      console.error("액세스 토큰 갱신 실패.");
    }
  }, 300000); // 5분 후 실행 (300,000ms)
};

// 모든 API 요청에 자동으로 `Device-Id` 및 `Access-Token` 포함
// 엑시오스 인터셉터 생성
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

//요청 인터셉터
apiClient.interceptors.request.use(async (config) => {
const accessToken = await AsyncStorage.getItem('accessToken');
const deviceId = await AsyncStorage.getItem('deviceId') || await DeviceInfo.getUniqueId();

if (!await AsyncStorage.getItem('deviceId')) {
 await AsyncStorage.setItem('deviceId', deviceId);
}

config.headers['Device-Id'] = deviceId;
if (accessToken) {
 config.headers['ACCESS-TOKEN'] = accessToken;
}

console.log('Request Config:', config);

return config;
}, (error) => Promise.reject(error));

//응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const deviceId = await AsyncStorage.getItem('deviceId');

      if (!refreshToken ) {
        console.warn('리프레시토큰이 없습니다. 로그인 필요.');
        return Promise.reject(error);
      }
      if (!deviceId) {
        console.warn('디바이스 아이디가 없습니다. 로그인 필요.');
        return Promise.reject(error);
      }

      try {
        originalRequest.headers['Refresh-Token'] = refreshToken;
        originalRequest.headers['Device-Id'] = deviceId;

        const refreshResponse = await apiClient(originalRequest);

        const newAccessToken = refreshResponse.headers['access-token'];
        const newRefreshToken = refreshResponse.headers['refresh-token'];

        if (newAccessToken && newRefreshToken) {
          await AsyncStorage.setItem('accessToken', newAccessToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);


          return refreshResponse;
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// 이메일 중복 검증
export const VerifiedEmail = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/member/check-email`, { email });
    return response.data; 
  } catch (error: any) {
    console.error("이메일 검증 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "이메일 검증 중 오류 발생");
  }
};

export const VerifiedPassword = async (
  password: string,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/member/check-password`,
    {password},
  );
  return response.data;
};

// 닉네임 중복 검증
export const verifiedNickName = async (nickname: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/member/check-nickname`, { nickname });
    return response.data; 
  } catch (error: any) {
    console.error("닉네임 검증 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "닉네임 검증 중 오류 발생");
  }
};

export const userLogout = async (
  password: string,
  email: string,
): Promise<void> => {
  await axios.post(`${API_URL}/api/member/sign-out`, {password, email});
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<void> => {
  await axios.post(`${API_URL}/api/member/change-password`, {
    oldPassword,
    newPassword,
  });
};

// 이메일 변경 
export const changeEmailEdit = async (email: string): Promise<{ success: boolean; message?: string }> => {
  console.log("이메일 변경 시도:", email);
  try {
    const token = await AsyncStorage.getItem('accessToken'); 

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.put(
      "/api/member/change-email",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    const newAccessToken = response.headers["access-token"];
    const newRefreshToken = response.headers["refresh-token"];

    if (newAccessToken && newRefreshToken) {
      console.log(" 이메일 변경 후 새 토큰 저장:", newAccessToken);
      await AsyncStorage.setItem("accessToken", newAccessToken);
      await AsyncStorage.setItem("refreshToken", newRefreshToken);
    }

    return response.data; 
  } catch (error: any) {
    console.error("이메일 변경 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "이메일 변경 중 오류 발생");
  }
};

// 이메일 인증 코드 발송
export const changeEmail = async (email: string): Promise<{ success: boolean; message?: string }> => {
  console.log(email);
  try {
    const token = await AsyncStorage.getItem('accessToken'); 

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.post(
      "/api/member/verify-code",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    console.error("이메일 인증코드 발송 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "이메일 인증코드 발송 중 오류 발생");
  }
};

// 닉네임 변경 
export const changeNickname = async (nickname: string): Promise<{ success: boolean; message?: string }> => {
  console.log(nickname);
  try {
    const token = await AsyncStorage.getItem('accessToken'); 

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.put(
      "/api/member/change-nickname",
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    console.error("닉네임 변경 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "닉네임 변경 중 오류 발생");
  }
};

// 상태메시지 변경 
export const changeStatusMessage = async (message: string): Promise<{ success: boolean; message?: string }> => {
  console.log(message);
  try {
    const token = await AsyncStorage.getItem('accessToken'); 

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const response = await apiClient.put(
      "/api/member/change-message",
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    console.error("상태메시지 변경 실패:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "상태메시지 변경 중 오류 발생");
  }
};

export const checkPasswordMatch = async (
  password: string,
): Promise<boolean> => {
  const response = await axios.post<{match: boolean}>(
    `${API_URL}/api/member/check-password-match`,
    {password},
  );
  return response.data.match;
};

export const deleteUserAccount = async (
  password: string,
  email: string,
): Promise<void> => {
  await axios.post(`${API_URL}/api/member/withdraw`, {password, email});
};

export const sendAuthCode = async (email: string): Promise<{data: boolean}> => {
  const response = await axios.post(`${API_URL}/api/member/verify-code`, {
    email,
  });
  return response.data;
};

export const findPassword = async (password: string): Promise<void> => {
  await axios.post(`${API_URL}/api/member/find-password`, {password});
};

export const findUsername = async (email: string): Promise<string> => {
  const response = await axios.post<{username: string}>(
    `${API_URL}/api/member/find-username`,
    {email},
  );
  return response.data.username;
};

// 이메일 인증코드 확인 
export const verifyAuthCode = async (
  email: string,
  code: string,
): Promise<boolean> => {
  const response = await axios.post<{data: boolean | string}>(
    `${API_URL}/api/member/check-code`,
    {email, code},
  );
  return response.data.data === true || response.data.data === 'true';
};

export const resetPassword = async (
  temporaryPassword: string,
  newPassword: string,
): Promise<void> => {
  await axios.post(`${API_URL}/api/member/reset-password`, {
    temporaryPassword,
    newPassword,
  });
};
