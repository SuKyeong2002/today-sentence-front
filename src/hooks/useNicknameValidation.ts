import { useState, useEffect } from 'react';

const useNicknameValidation = (nickname: any) => {
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateNickname = async () => {
      try {
        const response = await fetch('/api/member/check-nickname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nickname })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setValidationResult(data.success);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (nickname) {
      validateNickname();
    }
  }, [nickname]);

  return { validationResult, error };
};

export default useNicknameValidation;
