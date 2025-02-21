import {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
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
import axios from 'axios';
const API_URL = 'http://43.201.20.84';

interface UseAuthReturn {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  message: string;
  handleSignUp: (
    email: string,
    password: string,
    nickname: string,
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleChangePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<void>;
  handleChangeNickname: (nickname: string) => Promise<void>;
  handleChangeStatusMessage: (statusMessage: string) => Promise<void>;
  handleCheckPasswordMatch: (password: string) => Promise<boolean>;
  handleSendAuthCode: (email: string) => Promise<{data: boolean}>;
  handleFindPassword: (email: string) => Promise<void>;
  handleFindUsername: (email: string) => Promise<string>;
  handleVerifyAuthCode: (email: string, code: string) => Promise<boolean>;
  handleDeleteUserAccount: (email: string, password: string) => Promise<void>;
  handleVerifiedEmail: (email: string) => Promise<void>;
  handleVerifiedPassword: (password: string) => Promise<void>;
  handleVerifiedNickName: (nickname: string) => Promise<void>;
  handleUserLogout: (email: string, password: string) => Promise<void>;
  handleResetPassword: (
    temporaryPassword: string,
    newPassword: string,
  ) => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const setUniqueMessage = (newMessage: string) => {
    if (message !== newMessage) {
      setMessage(newMessage);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const signUpMutation = useMutation(() => signUpUser(username, password), {
    onSuccess: () => {
      setMessage('회원가입 성공!');
      queryClient.invalidateQueries('auth');
    },
    onError: () => {
      setMessage('회원가입 실패.');
    },
  });

  const loginMutation = useMutation(
    ({email, password}: {email: string; password: string}) =>
      signInUser(email, password),
    {
      onSuccess: async data => {
        console.log('받은 데이터:', data);

        if (data?.accessToken && data?.refreshToken) {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
          setUniqueMessage('로그인 성공!');
        } else {
          console.warn('토큰이 없습니다:', data);
          setUniqueMessage('회원정보가 없습니다.');
        }
      },
    },
  );

  // 이메일 중복 검증
  const emailValidationMutation = useMutation(
    async (email: string) => {
      return await VerifiedEmail(email);
    },
    {
      onSuccess: response => {
        if (response?.success) {
          setMessage('사용 가능한 이메일입니다.');
        } else {
          setMessage('중복된 이메일입니다.');
        }
      },
      onError: (error: any) => {
        console.error('이메일 검증 실패:', error.message);
        setMessage('이메일 검증 중 오류 발생');
      },
    },
  );

  const passwordValidationMutation = useMutation(
    (password: string) => VerifiedPassword(password),
    {
      onSuccess: () => {
        setMessage('비밀번호 검증 성공!');
      },
      onError: () => {
        setMessage('비밀번호 검증 실패.');
      },
    },
  );

  // 닉네임 중복 검증
  const nicknameValidationMutation = useMutation(
    async (nickname: string) => {
      return await verifiedNickName(nickname);
    },
    {
      onSuccess: response => {
        if (response?.success) {
          setMessage('사용 가능한 닉네임입니다.');
        } else {
          setMessage('중복된 닉네임입니다.');
        }
      },
      onError: (error: any) => {
        console.error('닉네임 검증 실패:', error.message);
        setMessage('닉네임 검증 중 오류 발생');
      },
    },
  );

  // 닉네임 변경
  const changeNicknameMutation = useMutation(
    async (nickname: string) => await changeNickname(nickname),
    {
      onSuccess: () => {
        setMessage('닉네임이 성공적으로 변경되었습니다.');
      },
      onError: (error: any) => {
        setMessage(
          `닉네임 변경 실패: ${error.response?.data?.message || '알 수 없는 오류'}`,
        );
      },
    },
  );

  const changeMessageMutation = useMutation(
    async (message: string) => await changeStatusMessage(message),
    {
      onSuccess: () => {
        setMessage('상태메시지가 성공적으로 변경되었습니다.');
      },
      onError: (error: any) => {
        setMessage(
          `상태메시지 변경 실패: ${error.response?.data?.message || '알 수 없는 오류'}`,
        );
      },
    },
  );

  const logoutMutation = useMutation(
    (emailPassword: {email: string; password: string}) =>
      userLogout(emailPassword.email, emailPassword.password),
    {
      onSuccess: () => {
        setMessage('로그아웃 성공!');
      },
    },
  );

  const deleteUserAccountMutation = useMutation(
    (emailPassword: {email: string; password: string}) =>
      deleteUserAccount(emailPassword.email, emailPassword.password),
    {
      onSuccess: () => {
        setMessage('회원탈퇴 성공!');
      },
      onError: () => {
        setMessage('회원탈퇴 실패.');
      },
    },
  );

  const resetPasswordMutation = useMutation(
    (passwords: {temporaryPassword: string; newPassword: string}) =>
      resetPassword(passwords.temporaryPassword, passwords.newPassword),
    {
      onSuccess: () => {
        setMessage('비밀번호 재설정 성공!');
      },
      onError: () => {
        setMessage('비밀번호 재설정 실패.');
      },
    },
  );

  const handleSignUp = async () => {
    signUpMutation.mutate();
  };

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      console.warn('이메일 또는 비밀번호가 없습니다.');
      return;
    }
    loginMutation.mutate({email, password});
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
    logoutMutation.mutate({email, password});
  };

  const handleDeleteUserAccount = async (email: string, password: string) => {
    deleteUserAccountMutation.mutate({email, password});
  };

  const handleResetPassword = async (
    temporaryPassword: string,
    newPassword: string,
  ) => {
    resetPasswordMutation.mutate({temporaryPassword, newPassword});
  };

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    await changePassword(oldPassword, newPassword);
    setMessage('비밀번호 변경 성공!');
  };

  // 닉네임 변경 핸들러
  const handleChangeNickname = async (nickname: string) => {
    try {
      const response = await changeNicknameMutation.mutateAsync(nickname);
      console.log('닉네임 변경 성공:', response);
    } catch (error: any) {
      console.error('닉네임 변경 실패:', error.message);
      throw new Error(error.message || '닉네임 변경 실패');
    }
  };

  // 상태메시지 변경 핸들러
  const handleChangeStatusMessage = async (message: string) => {
    try {
      const response = await changeMessageMutation.mutateAsync(message);
      console.log('상태메시지 변경 성공:', response);
    } catch (error: any) {
      console.error('상태메시지 변경 실패:', error.message);
      throw new Error(error.message || '상태메시지 변경 실패');
    }
  };

  const handleCheckPasswordMatch = async (password: string) => {
    const match = await checkPasswordMatch(password);
    setMessage(match ? '비밀번호 일치!' : '비밀번호 불일치.');
    return match;
  };

  const handleSendAuthCode = async (
    email: string,
  ): Promise<{data: boolean}> => {
    return await sendAuthCode(email);
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

  const handleVerifyAuthCode = async (email: string, code: string) => {
    const verified = await verifyAuthCode(email, code);
    console.log(verified);
    setMessage(verified ? '코드 인증 성공!' : '코드 인증 실패.');
    return verified;
  };

  // 검색
  interface UseAuthReturn {
    handleSearch: (query: string, filter: string) => Promise<void>;
  }

  const useAuth = (): UseAuthReturn => {
    const [searchResults, setSearchResults] = useState<any>(null);

    // ✅ 검색 API 요청 (검색어 및 필터 전달)
    const searchMutation = useMutation(
      async ({query, filter}: {query: string; filter: string}) => {
        const response = await axios.get(`${API_URL}/api/search/books`, {
          params: {searchText: query, selectedOption: filter},
        });
        return response.data;
      },
      {
        onSuccess: data => {
          console.log('🔍 검색 결과:', data);
          setSearchResults(data);
        },
        onError: error => {
          console.error('❌ 검색 오류:', error);
        },
      },
    );

    // ✅ 검색 실행 함수 정의
    const handleSearch = async (query: string, filter: string) => {
      if (!query.trim() || !filter) {
        console.warn('🚨 검색어 또는 필터가 비어 있습니다.');
        return;
      }
      searchMutation.mutate({query, filter});
    };

    return {
      handleSearch, // ✅ 검색 함수 반환
    };
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
function changeMessage(message: string): any {
  throw new Error('Function not implemented.');
}
