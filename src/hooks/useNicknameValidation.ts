import { useState } from 'react';

const useNicknameValidation = () => {
  const [validationResult, setValidationResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateNickname = async (nickname: string) => {
    if (!nickname) {
      setValidationResult(null);
      setError(null);
      return;
    }

    try {
      const response = await fetch('/api/member/check-nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) {
        throw new Error('네트워크 오류 발생');
      }

      const data = await response.json();
      setValidationResult(data.success);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setValidationResult(null);
    }
  };

  return { validationResult, error, validateNickname };
};

export default useNicknameValidation;
