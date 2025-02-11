import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  signInUser,
  signUpUser,
  VerifiedEmail,
  VerifiedPassword,
  verifiedNickName,
  userLogout,
  changePassword,
  changeNickname,
  changeStatusMessage,
  checkPasswordMatch,
  deleteUserAccount,
  sendAuthCode,
  findPassword,
  findUsername,
  verifyAuthCode,
  resetPassword,
} from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseAuthReturn {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  message: string;
  handleSignUp: (email: string, password: string, nickname: string) => Promise<void>;
  handleLogin: () => Promise<void>;
  handleChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  handleChangeNickname: (nickname: string) => Promise<void>;
  handleChangeStatusMessage: (statusMessage: string) => Promise<void>;
  handleCheckPasswordMatch: (password: string) => Promise<boolean>;
  handleSendAuthCode: (email: string) => Promise<{ data : string }>;
  handleFindPassword: (email: string) => Promise<void>;
  handleFindUsername: (email: string) => Promise<string>;
  handleVerifyAuthCode: (code: string) => Promise<boolean>;
  handleDeleteUserAccount: (email: string, password: string) => Promise<void>;
  handleVerifiedEmail: (email: string) => Promise<void>;
  handleVerifiedPassword: (password: string) => Promise<void>;
  handleVerifiedNickName: (nickname: string) => Promise<void>;
  handleUserLogout: (email: string, password: string) => Promise<void>;
  handleResetPassword: (temporaryPassword: string, newPassword: string) => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const signUpMutation = useMutation(() => signUpUser(username, password), {
    onSuccess: () => {
      setMessage('회원가입 성공!');
      queryClient.invalidateQueries('auth');
    },
    onError: () => {
      setMessage('회원가입 실패.');
    },
  });

  const loginMutation = useMutation(() => signInUser(username, password), {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('token', data.token);
      setMessage('로그인 성공!');
    },
    onError: () => {
      setMessage('로그인 실패.');
    },
  });

  const emailValidationMutation = useMutation((email: string) => VerifiedEmail(email), {
    onSuccess: () => {
      setMessage('이메일 검증 성공!');
    },
    onError: () => {
      setMessage('이메일 검증 실패.');
    },
  });

  const passwordValidationMutation = useMutation((password: string) => VerifiedPassword(password), {
    onSuccess: () => {
      setMessage('비밀번호 검증 성공!');
    },
    onError: () => {
      setMessage('비밀번호 검증 실패.');
    },
  });

  const nicknameValidationMutation = useMutation((nickname: string) => verifiedNickName(nickname), {
    onSuccess: () => {
      setMessage('닉네임 검증 성공!');
    },
    onError: () => {
      setMessage('닉네임 검증 실패.');
    },
  });

  const logoutMutation = useMutation((emailPassword: { email: string; password: string }) => userLogout(emailPassword.email, emailPassword.password), {
    onSuccess: () => {
      setMessage('로그아웃 성공!');
    },
    onError: () => {
      setMessage('로그아웃 실패.');
    },
  });

  const deleteUserAccountMutation = useMutation((emailPassword: { email: string; password: string }) => deleteUserAccount(emailPassword.email, emailPassword.password), {
    onSuccess: () => {
      setMessage('회원탈퇴 성공!');
    },
    onError: () => {
      setMessage('회원탈퇴 실패.');
    },
  });

  const resetPasswordMutation = useMutation((passwords: { temporaryPassword: string, newPassword: string }) => resetPassword(passwords.temporaryPassword, passwords.newPassword), {
    onSuccess: () => {
      setMessage('비밀번호 재설정 성공!');
    },
    onError: () => {
      setMessage('비밀번호 재설정 실패.');
    },
  });

  const handleSignUp = async () => {
    signUpMutation.mutate();
  };

  const handleLogin = async () => {
    loginMutation.mutate();
  };

  const handleVerifiedEmail = async (email: string) => {
    emailValidationMutation.mutate(email);
  };

  const handleVerifiedPassword = async (password: string) => {
    passwordValidationMutation.mutate(password);
  };

  const handleVerifiedNickName = async (nickname: string) => {
    nicknameValidationMutation.mutate(nickname);
  };

  const handleUserLogout = async (email: string, password: string) => {
    logoutMutation.mutate({ email, password });
  };

  const handleDeleteUserAccount = async (email: string, password: string) => {
    deleteUserAccountMutation.mutate({ email, password });
  };

  const handleResetPassword = async (temporaryPassword: string, newPassword: string) => {
    resetPasswordMutation.mutate({ temporaryPassword, newPassword });
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    await changePassword(oldPassword, newPassword);
    setMessage('비밀번호 변경 성공!');
  };

  const handleChangeNickname = async (nickname: string) => {
    await changeNickname(nickname);
    setMessage('닉네임 변경 성공!');
  };

  const handleChangeStatusMessage = async (statusMessage: string) => {
    await changeStatusMessage(statusMessage);
    setMessage('상태 메시지 변경 성공!');
  };

  const handleCheckPasswordMatch = async (password: string) => {
    const match = await checkPasswordMatch(password);
    setMessage(match ? '비밀번호 일치!' : '비밀번호 불일치.');
    return match;
  };

  const handleSendAuthCode = async (email: string): Promise<{data: string}> => {
    try {
      console.log('인증 코드 전송 시작:', email);
      await sendAuthCode(email); // 인증 코드 전송 함수 호출
      console.log('인증 코드 전송 성공');
      
      setMessage('인증 코드 전송 성공!');
      return {data: '입력하신 메일로 인증번호 전송 완료' }; // 성공 시 data에 메시지 담기
    } catch (error) {
      // 에러 상세 정보 출력
      console.error('인증 코드 전송 실패 상세:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      setMessage('인증 코드 전송 실패.');
      return {data: ''}; // 실패 시 빈 문자열 반환
    }
  };
  

  const handleFindPassword = async (email: string) => {
    await findPassword(email);
    setMessage('비밀번호 찾기 성공!');
  };

  const handleFindUsername = async (email: string) => {
    const username = await findUsername(email);
    setMessage('아이디 찾기 성공!');
    return username;
  };

  const handleVerifyAuthCode = async (code: string) => {
    const verified = await verifyAuthCode(code);
    setMessage(verified ? '코드 인증 성공!' : '코드 인증 실패.');
    return verified;
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleSignUp,
    handleLogin,
    handleChangePassword,
    handleChangeNickname,
    handleChangeStatusMessage,
    handleCheckPasswordMatch,
    handleSendAuthCode,
    handleFindPassword,
    handleFindUsername,
    handleVerifyAuthCode,
    handleDeleteUserAccount,
    handleVerifiedEmail,
    handleVerifiedPassword,
    handleVerifiedNickName,
    handleUserLogout,
    handleResetPassword,
  };
};

export default useAuth;
