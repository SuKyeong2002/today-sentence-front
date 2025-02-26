import {fetchRecordBookList} from '@/api/recordBookList';
import {useQuery} from 'react-query';

export const useBookmarkBookList = (year: number, month: number) => {
  return useQuery(
    ['recordBookList', year, month],
    () => fetchRecordBookList(year, month),
    {
      onError: error => console.error('기록한 명언 목록 로딩 실패:', error),
    },
  );
};
