import { useState } from "react";
import { sendResetCode, verifyResetCode, resetPassword } from "../api/authPassword";

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sendResetCode(email);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await verifyResetCode(email, code);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (email: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resetPassword(email, newPassword);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendCode, verifyCode, updatePassword };
};
