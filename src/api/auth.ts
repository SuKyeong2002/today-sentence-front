import axios from 'axios';

const API_URL = 'https://43.201.20.84';

export interface AuthResponse {
  token: string;
}

export const signUpUser = (username: string, password: string): Promise<AuthResponse> => {
  return axios.post<AuthResponse>(`${API_URL}/api/member/sign-up`, { username, password });
};

export const loginUser = (username: string, password: string): Promise<AuthResponse> => {
  return axios.post<AuthResponse>(`${API_URL}/api/member/sign-in`, { username, password });
};
