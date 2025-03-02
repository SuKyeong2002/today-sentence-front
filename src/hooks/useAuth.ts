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
  findEmail,
  findPassword,
  findUsername,
  verifyAuthCode,
  resetPassword,
  changeEmail,
  changeEmailEdit,
  CheckedPassword,
} from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  handleChangePassword: (checkChangePassword: string) => Promise<void>;
  handleChangeNickname: (nickname: string) => Promise<void>;
  handleChangeEmail: (email: string) => Promise<void>;
  handleChangeEmail2: (email: string) => Promise<void>;
  handleChangeStatusMessage: (statusMessage: string) => Promise<void>;
  handleCheckPasswordMatch: (password: string) => Promise<boolean>;
  handleCheckedPassword: (password: string) => Promise<void>;
  handleSendAuthCode: (email: string) => Promise<{data: boolean}>;
  handleFindPassword: (email: string) => Promise<void>;
  handleFindUsername: (nickname: string) => Promise<void>;
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

  // 회원가입 
  const signUpMutation = useMutation(
    ({ email, nickname, password }: { email: string; nickname: string; password: string }) =>
      signUpUser(email, nickname, password),
    {
      onSuccess: () => {
        // console.log('회원가입 성공! 로그인 화면으로 이동합니다.');
      },
      onError: (error: any) => {
        // console.log(`회원가입 실패: ${error.response?.data?.message || '알 수 없는 오류'}`);
      },
    }
  );
  
  const loginMutation = useMutation(
    ({email, password}: {email: string; password: string}) =>
      signInUser(email, password),

    {
      onSuccess: async data => {
        if (data?.accessToken && data?.refreshToken) {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
          setUniqueMessage('로그인 성공');
        } else {
          setUniqueMessage('로그인 실패');
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
        // console.error('이메일 검증 실패:', error.message);
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
        // console.error('닉네임 검증 실패:', error.message);
        setMessage('닉네임 검증 중 오류 발생');
      },
    },
  );

  // 이메일 인증 번호 발송
  const changeEmailMutation = useMutation(
    async (email: string) => await changeEmail(email),
    {
      onSuccess: () => {
        setMessage('이메일로 인증번호가 발송되었습니다.');
      },
      onError: (error: any) => {
        setMessage(
          `이메일 인증 실패: ${error.response?.data?.message || '알 수 없는 오류'}`,
        );
      },
    },
  );

  // 이메일 변경
  const changeEmailEditMutation = useMutation(
    async (email: string) => await changeEmailEdit(email),
    {
      onSuccess: () => {
        setMessage('이메일 변경 성공');
      },
      onError: (error: any) => {
        setMessage(
          `이메일 변경 실패: ${error.response?.data?.message || '알 수 없는 오류'}`,
        );
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

  // 비밀번호 변경
  const changePasswordMutation = useMutation(
    async (password: string) => await changePassword(password),
    {
      onSuccess: () => {
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
      },
      onError: (error: any) => {
        setMessage(
          `비밀번호 변경 실패: ${error.response?.data?.message || '알 수 없는 오류'}`,
        );
      },
    },
  );

  // 상태메세지 변경
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

  // 아이디 찾기
  const findEmailMutation = useMutation(
    async (nickname: string) => {
      return await findEmail(nickname);
    },
    {
      onSuccess: response => {
        if (response?.success) {
          setMessage('아이디 찾기 성공');
        } else {
          setMessage('아이디 찾기 살패');
        }
      },
      onError: (error: any) => {
        // console.error('아이디 찾기 실패:', error.message);
        setMessage('아이디 찾기 중 오류 발생');
      },
    },
  );

  // 비밀번호 찾기
  const findPasswordMutation = useMutation(
    async (email: string) => {
      return await findPassword(email);
    },
    {
      onSuccess: response => {
        if (response?.success) {
          setMessage('비밀번호 찾기 성공');
        } else {
          setMessage('비밀번호 찾기 살패');
        }
      },
      onError: (error: any) => {
        // console.error('비밀번호 찾기 실패:', error.message);
        setMessage('비밀번호 찾기 중 오류 발생');
      },
    },
  );

  //  비밀번호 일치 여부 확인
  const passwordCheckMutation = useMutation(
    async (password: string) => {
      return await CheckedPassword(password);
    },
    {
      onSuccess: response => {
        if (response?.success) {
          setMessage('확인되었습니다.');
        } else {
          setMessage('잘못된 비밀번호입니다.');
        }
      },
      onError: (error: any) => {
        // console.error('비밀번호 일치 여부 확인 실패:', error.message);
        setMessage('비밀번호 일치 여부 확인 중 오류 발생');
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

  // 회원가입 핸들러
  const handleSignUp = async (email: string, nickname: string, password: string) => {
    signUpMutation.mutate({ email, nickname, password });
  };
  
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      // console.warn('이메일 또는 비밀번호가 없습니다.');
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

  // 비밀번호 일치 여부 확인 핸들러
  const handleCheckedPassword = async (password: string) => {
    try {
      const response = await passwordCheckMutation.mutateAsync(password);
      // console.log('비밀번호 일치 여부 확인 성공', response);
    } catch (error: any) {
      // console.error('비밀번호 일치 여부 확인 실패:', error.message);
      throw new Error(error.message || '비밀번호 일치 여부 확인 실패');
    }
  };

  // 이메일 변경 핸들러
  const handleChangeEmail = async (email: string) => {
    try {
      const response = await changeEmailMutation.mutateAsync(email);
      // console.log('이메일 인증번호 발송 성공', response);
    } catch (error: any) {
      // console.error('이메일 인증 실패:', error.message);
      throw new Error(error.message || '이메일 인증 실패');
    }
  };

  // 이메일 변경 핸들러
  const handleChangeEmail2 = async (email: string) => {
    try {
      const response = await changeEmailEditMutation.mutateAsync(email);
      // console.log('이메일 변경 성공:', response);
    } catch (error: any) {
      // console.error('이메일 변경 실패:', error.message);
      throw new Error(error.message || '이메일 변경 실패');
    }
  };

  // 닉네임 변경 핸들러
  const handleChangeNickname = async (nickname: string) => {
    try {
      const response = await changeNicknameMutation.mutateAsync(nickname);
      // console.log('닉네임 변경 성공:', response);
    } catch (error: any) {
      // console.error('닉네임 변경 실패:', error.message);
      throw new Error(error.message || '닉네임 변경 실패');
    }
  };

  // 비밀번호 변경 핸들러
  const handleChangePassword = async (password: string) => {
    try {
      const response = await changePasswordMutation.mutateAsync(password);
      // console.log('비밀번호 변경 성공:', response);
    } catch (error: any) {
      // console.error('비밀번호 변경 실패:', error.message);
      throw new Error(error.message || '비밀번호 변경 실패');
    }
  };

  // 상태메시지 변경 핸들러
  const handleChangeStatusMessage = async (message: string) => {
    try {
      const response = await changeMessageMutation.mutateAsync(message);
      // console.log('상태메시지 변경 성공:', response);
    } catch (error: any) {
      // console.error('상태메시지 변경 실패:', error.message);
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

  // 아이디 찾기 핸들러
  const handleFindUsername = async (nickname: string) => {
    try {
      const response = await findEmailMutation.mutateAsync(nickname);
      // console.log('아이디 찾기 성공', response);
    } catch (error: any) {
      // console.error('아이디 찾기 실패:', error.message);
      throw new Error(error.message || '아이디 찾기 실패');
    }
  };

  // 비밀번호 찾기 핸들러
  const handleFindPassword = async (email: string) => {
    try {
      const response = await findPasswordMutation.mutateAsync(email);
      // console.log('비밀번호 찾기 성공', response);
    } catch (error: any) {
      // console.error('비밀번호 찾기 실패:', error.message);
      throw new Error(error.message || '비밀번호 찾기 실패');
    }
  };

  const handleVerifyAuthCode = async (email: string, code: string) => {
    const verified = await verifyAuthCode(email, code);
    // console.log(verified);
    setMessage(verified ? '코드 인증 성공!' : '코드 인증 실패.');
    return verified;
  };

  // 검색
  interface UseAuthReturn {
    handleSearch: (query: string, filter: string) => Promise<void>;
  }

  const useAuth = (): UseAuthReturn => {
    const [searchResults, setSearchResults] = useState<any>(null);

    // 검색 API 요청 (검색어 및 필터 전달)
    const searchMutation = useMutation(
      async ({query, filter}: {query: string; filter: string}) => {
        const response = await axios.get(`/api/search/books`, {
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

    // 검색 실행 함수 정의
    const handleSearch = async (query: string, filter: string) => {
      if (!query.trim() || !filter) {
        // console.warn('🚨 검색어 또는 필터가 비어 있습니다.');
        return;
      }
      searchMutation.mutate({query, filter});
    };

    return {
      handleSearch, // 검색 함수 반환
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
    handleChangeEmail,
    handleChangeEmail2,
    handleCheckedPassword,
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
