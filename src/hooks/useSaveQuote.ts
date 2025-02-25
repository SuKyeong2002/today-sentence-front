import { useState } from 'react';
import { Alert } from 'react-native';
import { QuoteData } from '../types/QuoteData';
import { saveQuote } from '../api/quoteApi';

export const useSaveQuote = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveQuote = async (data: QuoteData) => {
    setIsSaving(true);
    try {
      await saveQuote(data);
      Alert.alert('성공', '명언이 성공적으로 저장되었습니다.');
    } catch (err) {
      setError('저장 중 오류 발생');
      Alert.alert('오류', '저장 중 문제가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, error, handleSaveQuote };
};
