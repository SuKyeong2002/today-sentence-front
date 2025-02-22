import { useState } from 'react';
import { Book } from '../types';
import { searchBooks } from '../api';

export function useSearchBooks() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchBooks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { searchQuery, searchResults, loading, error, handleSearch, setSearchQuery };
}