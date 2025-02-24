import {fetchBookmarkBookList} from '@/api/bookmarkBookList';
import {useQuery} from 'react-query';

export const useBookmarkBookList = (year: number, month: number) => {
  return useQuery(
    ['recordBookList', year, month],
    () => fetchBookmarkBookList(year, month),
    {
      onError: error => console.error('기록한 명언 목록 로딩 실패:', error),
    },
  );
};
