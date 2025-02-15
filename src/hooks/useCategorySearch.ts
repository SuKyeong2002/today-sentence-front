import {apiClient} from '@/api/auth';
import {useQuery} from 'react-query';

export const useCategorySearch = (
  type: string,
  search: string,
  page = 1,
  size = 10,
) => {
  return useQuery(
    ['category', search, page, size],
    async () => {
      console.log('카테고리리로 명언 검색 요청:', {
        type: 'category',
        search,
        page,
        size,
      });

      const response = await apiClient.get('/api/search/posts', {
        params: {type: 'category', search, page, size},
      });

      console.log('카테고리 검색 결과:', response.data);
      return response.data.data;
    },
    {
      retry: false,
      onError: error => console.error('카테고리 검색 오류:', error),
    },
  );
};
