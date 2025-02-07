import { useState } from 'react';

const useEmailValidation = () => {
  const [validationResult, setValidationResult] = useState<string | boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = async (email: string) => {
    if (!email) {
      setValidationResult(null);
      setError(null);
      return;
    }

    try {
      const response = await fetch('http://43.201.20.84/api/member/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 204) {
        setValidationResult(true); 
        setError(null);
      } else if (!response.ok) {
        throw new Error('네트워크 오류 발생');
      } else {
        const data = await response.json();
        setValidationResult(data.data.success);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
      setValidationResult(null);
    }
  };

  return { validationResult, error, validateEmail };
};

export default useEmailValidation;