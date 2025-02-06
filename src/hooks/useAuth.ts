import { useState } from 'react';
import { signInUser, signUpUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseAuthReturn {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  message: string;
  handleSignUp: () => Promise<void>;
  handleLogin: () => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSignUp = async () => {
    try {
      await signUpUser(username, password);
      setMessage('회원가입 성공!');
    } catch (error) {
      setMessage('회원가입 실패.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await signInUser(username, password);
      await AsyncStorage.setItem('token', response.token);
      setMessage('로그인 성공!');
    } catch (error) {
      setMessage('로그인 실패.');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleSignUp,
    handleLogin,
  };
};

export default useAuth;
