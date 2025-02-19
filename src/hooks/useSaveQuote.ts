import { useState } from 'react';
import { QuoteData } from '../types/QuoteData';
import { saveQuote } from '../api/record';

export function useSaveQuote() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveQuote(data: QuoteData) {
    setIsSaving(true);
    setError(null);
    try {
      await saveQuote(data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return { isSaving, error, handleSaveQuote };
}