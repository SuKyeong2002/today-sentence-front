import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './auth';

export const fetchSearchResults = async (type: string, search: string, page: number, size: number) => {
    console.log("검색 요청:", { type, search, page, size });
  
    try {
      const response = await apiClient.get("/api/search/books", {
        params: { type, search, page: page - 1, size },
      });
  
      console.log("검색 결과:", response.data);
      return response.data.data; 
    } catch (error) {
      console.error("검색 API 에러:", error);
      throw error;
    }
  };
  
  
  apiClient.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("accessToken이 없습니다. 로그인 상태를 확인하세요.");
    }
    return config;
  });