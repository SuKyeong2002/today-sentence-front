import { useState } from 'react';

const usePasswordValidation = () => {
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = async (email: string) => {
    if (!email) {
      setValidationResult(null);
      setError(null);
      return;
    }

    try {
      const response = await fetch('http://43.201.20.84/api/member/checkPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('네트워크 오류 발생');
      }

      const data = await response.json();
      setValidationResult(data.data.success);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setValidationResult(null);
    }
  };

  return { validationResult, error, validatePassword };
};

export default usePasswordValidation ;
