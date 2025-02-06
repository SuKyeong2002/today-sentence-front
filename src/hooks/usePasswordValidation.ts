import { useState, useEffect } from 'react';

const usePasswordValidation = (password: any) => {
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validatePassword = async () => {
      try {
        const response = await fetch('/api/member/checkPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setValidationResult(data.success);
      } catch (error : any) {
        setError(error.message);
      }
    };

    if (password) {
      validatePassword();
    }
  }, [password]);

  return { validationResult, error };
};

export default usePasswordValidation;
