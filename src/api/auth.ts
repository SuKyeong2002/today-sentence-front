import axios from 'axios';

const API_URL = 'http://43.201.20.84';

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
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await axios.post(
    `${API_URL}/api/member/sign-in`,
    {email, password},
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  console.log('로그인 응답 데이터:', response.data);
  console.log('ACCESS-TOKEN:', response.headers['access-token']);
  console.log('REFRESH-TOKEN:', response.headers['refresh-token']);

  return {
    accessToken: response.headers['access-token'],
    refreshToken: response.headers['refresh-token'],
  };
};

export const VerifiedEmail = async (email: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/member/check-email`,
    {email},
  );
  return response.data;
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

export const verifiedNickName = async (
  nickname: string,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/api/member/check-nickname`,
    {nickname},
  );
  return response.data;
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

export const changeNickname = async (nickname: string): Promise<void> => {
  await axios.post(`${API_URL}/api/member/change-nickname`, {nickname});
};

export const changeStatusMessage = async (
  statusMessage: string,
): Promise<void> => {
  await axios.post(`${API_URL}/api/member/change-message`, {statusMessage});
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
