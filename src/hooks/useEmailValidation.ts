import { useState, useEffect } from 'react';

const useEmailValidation = (email : any) => {
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateEmail = async () => {
      try {
        const response = await fetch('/api/member/checkEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setValidationResult(data.success);
      } catch (error :any) {
        setError(error.message);
      }
    };

    if (email) {
      validateEmail();
    }
  }, [email]);

  return { validationResult, error };
};

export default useEmailValidation;
