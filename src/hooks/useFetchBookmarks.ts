import { useState, useEffect } from 'react';
import { Bookmark } from '../types/Bookmark';
import { fetchBookmarks } from '../api/record';

export function useFetchBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getBookmarks() {
      try {
        const data = await fetchBookmarks();
        setBookmarks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getBookmarks();
  }, []);

  return { bookmarks, loading, error };
}
