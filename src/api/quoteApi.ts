import { QuoteData } from '../types/QuoteData';

const API_URL = 'http://3.34.197.35/api/posts'; // 실제 API URL로 변경

export const saveQuote = async (data: QuoteData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('API 요청 실패');
  }

  return await response.json();
};
