import { useState } from "react";
import { findEmailByUsername } from "../api/userApi";

export const useFindEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmail = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await findEmailByUsername(username);
      setEmail(data.email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, isLoading, error, fetchEmail };
};
