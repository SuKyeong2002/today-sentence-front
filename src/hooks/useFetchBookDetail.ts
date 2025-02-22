import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { fetchBookDetail } from '../api/record';

export function useFetchBookDetail(postId: number) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getBookDetail() {
      try {
        const data = await fetchBookDetail(postId);
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getBookDetail();
  }, [postId]);

  return { book, loading, error };
}
