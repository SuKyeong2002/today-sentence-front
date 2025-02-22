import { useState } from 'react';
import { QuoteDetailData } from '../types/QuoteDetailData';
import { GetQuoteDetail } from '../api/record';

export function useGetQuoteDetail() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveQuote(data: QuoteDetailData) {
    setIsSaving(true);
    setError(null);
    try {
      // data 객체에서 필요한 값들을 추출하여 GetQuoteDetail 함수에 전달
      const { postId, bookTitle, bookAuthor, bookPublisher, bookPublishingYear, bookCover, category, hashtages } = data;
      await GetQuoteDetail(postId, bookTitle, bookAuthor, bookPublisher, bookPublishingYear, bookCover, category, hashtages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return { isSaving, error, handleSaveQuote };
}