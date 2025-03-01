import { verifiedNickName } from '@/api/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMutation } from 'react-query';
import useAuth from '../../hooks/useAuth';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function SignUpSteps() {
  const {
    handleVerifiedEmail,
    handleVerifiedNickName,
    handleVerifiedPassword,
    handleSignUp,
    handleSendAuthCode,
    handleVerifyAuthCode,
  } = useAuth();
  const {t} = useTranslation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [emailValidationResult, setEmailValidationResult] = useState(false);
  const [nicknameValidationResult, setNicknameValidationResult] =
    useState(false);
  const [passwordValidationResult, setPasswordValidationResult] =
    useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [codeMessage, setCodeMessage] = useState<string | null>(null);
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<
    string | null
  >(null);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<
    boolean | null
  >(null);

  const handleEmailCheck = async () => {
    if (!email.includes('@')) {
      Alert.alert('오류', '유효한 이메일을 입력하세요.');
      return;
    }

    setIsEmailSent(true);
    setEmailMessage(null);

    try {
      console.log('이메일 전송 시도:', email);
      const response = await handleSendAuthCode(email);

      console.log('이메일 전송 응답:', response);

      if (response?.data === true) {
        setEmailMessage('✅ 인증번호를 전송하였습니다.');
      } else {
        setIsEmailSent(false);
        setEmailMessage('❌ 인증번호를 전송하는데 실패했습니다.');
      }
    } catch (error) {
      setIsEmailSent(false);
      setEmailMessage('❌ 인증번호를 전송하는데 실패했습니다.');
    }
  };

  // 이메일 변경 시 전송 버튼 다시 활성화
  useEffect(() => {
    setIsEmailSent(false);
    setEmailMessage(null);
  }, [email]);

  // 이메일 인증 확인
  useEffect(() => {
    if (isEmailSent) {
      const verifyEmail = async () => {
        try {
          await handleVerifiedEmail(email);
          setIsEmailSent(false);
        } catch (error) {
          console.error('이메일 인증 확인 중 오류 발생:', error);
        }
      };
      verifyEmail();
    }
  }, [isEmailSent, email, handleVerifiedEmail]);

  // 인증 코드 검증 함수
  const handleEmailVerification = async () => {
    try {
      const isCodeValid = await handleVerifyAuthCode(email, enteredCode);
      if (isCodeValid === true) {
        setEmailValidationResult(true);
        setIsCodeConfirmed(true); // 확인 후 버튼 비활성화
        setCodeMessage('✅ 인증이 완료되었습니다.');
      } else {
        setCodeMessage('❌ 인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setCodeMessage('❌ 인증번호가 올바르지 않습니다.');
    }
  };

  useEffect(() => {
    setIsCodeConfirmed(false);
    setCodeMessage(null);
  }, [enteredCode]);

  // 이메일 인증 확인
  useEffect(() => {
    if (isEmailSent) {
      const verifyEmail = async () => {
        try {
          await handleVerifiedEmail(email);
          setIsEmailSent(false);
        } catch (error) {
          console.error('이메일 인증 확인 중 오류 발생:', error);
        }
      };
      verifyEmail();
    }
  }, [isEmailSent, email, handleVerifiedEmail]);

  // 닉네임 중복 검사
  const nicknameValidationMutation = useMutation(
    async (nickname: string) => {
      return await verifiedNickName(nickname);
    },
    {
      onSuccess: response => {
        setIsNicknameValid(true);
        setNicknameMessage('✅ 사용 가능한 닉네임입니다.');
        setNicknameValidationResult(true);
      },
      onError: (error: any) => {
        setIsNicknameValid(false);
        setNicknameMessage('❌ 이미 사용 중인 닉네임입니다.');
      },
    },
  );

  // 닉네임 입력란 공백 확인
  const handleDuplicateCheck = async () => {
    if (nickname.trim().length === 0) {
      setNicknameMessage('❌ 닉네임을 입력해주세요.');
      return;
    }
    nicknameValidationMutation.mutate(nickname);
  };

  // 닉네임 변경 시 메시지 초기화
  useEffect(() => {
    setNicknameMessage(null);
    setIsNicknameValid(null);
  }, [nickname]);

  // 비밀번호
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,16}$/;
    return regex.test(password);
  };

  const handlePasswordCheck = () => {
    if (password.length === 0) {
      setPasswordMessage('❌ 비밀번호를 입력해주세요.');
      setIsPasswordValid(false);
      return;
    }
    if (!validatePassword(password)) {
      setPasswordMessage(
        '❌ 영문자, 숫자, 특문 조합의 10자 이상 16자 이하여야 합니다.',
      );
      setIsPasswordValid(false);
      return;
    }
    setPasswordMessage('✅ 사용 가능한 비밀번호입니다.');
    setIsPasswordValid(true);
    setPasswordValidationResult(true);
  };

  // 비밀번호 재확인 검사
  const handleConfirmPasswordCheck = (text: string) => {
    setConfirmPassword(text); // 입력값 업데이트

    if (text.length === 0) {
      setConfirmPasswordMessage('❌ 비밀번호를 다시 입력해주세요.');
      setIsConfirmPasswordValid(false);
      return;
    }
    if (password !== text) {
      setConfirmPasswordMessage('❌ 비밀번호가 일치하지 않습니다.');
      setIsConfirmPasswordValid(false);
      return;
    }

    setConfirmPasswordMessage('✅ 비밀번호가 일치합니다.');
    setIsConfirmPasswordValid(true);

    setTimeout(() => {
      setConfirmPasswordMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (password && confirmPassword) {
      handleConfirmPasswordCheck(confirmPassword);
    }
  }, [password, confirmPassword]);

  // 입력 변경 시 메시지 초기화
  useEffect(() => {
    setPasswordMessage(null);
    setIsPasswordValid(null);
  }, [password]);

  const handleNextStep = async () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    if (step === 4) {
      await handleSignUp(email, nickname, password); 
      setStep(5);

      setTimeout(() => {
        navigation.navigate('Login'); 
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  if (step === 5) {
    return (
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('@/assets/animation/loading_success.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <Text style={styles.successMessage}>회원가입이 완료되었습니다!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {step <= 4 && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/image/back.png')}
            style={[styles.backIcon]}
          />
        </TouchableOpacity>
      )}
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map(num => (
          <Text
            key={num}
            style={[
              styles.progressDot,
              step === num ? styles.activeDot : null,
            ]}>
            ●
          </Text>
        ))}
      </View>

      {step === 1 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>이메일을 입력해주세요</Text>
          <Text style={styles.subtitle}>6자리의 인증번호를 보내드려요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email.trim()}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                email.length > 0 && email.includes('@') && !isEmailSent
                  ? styles.checkButtonEnabled
                  : styles.checkButtonDisabled,
              ]}
              onPress={handleEmailCheck}
              disabled={
                !(email.length > 0 && email.includes('@')) || isEmailSent
              } // 조건 만족 시에만 활성화
            >
              <Text style={styles.checkButtonText}>
                {isEmailSent ? '전송됨' : '전송'}
              </Text>
            </TouchableOpacity>
          </View>
          {emailMessage && (
            <Text style={styles.emailMessage}>{emailMessage}</Text>
          )}
          <View style={styles.inputContainer1}>
            <TextInput
              style={styles.input}
              placeholder="인증번호 입력"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={enteredCode.trim()}
              onChangeText={setEnteredCode}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                enteredCode.length >= 1 && !isCodeConfirmed
                  ? styles.checkButtonEnabled
                  : styles.checkButtonDisabled,
              ]}
              disabled={enteredCode.length < 1 || isCodeConfirmed}
              onPress={handleEmailVerification}>
              <Text style={styles.checkButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
          {codeMessage && (
            <Text
              style={[
                styles.message,
                codeMessage.includes('❌')
                  ? styles.errorMessage
                  : styles.successMessage,
              ]}>
              {codeMessage}
            </Text>
          )}
        </View>
      )}

      {step === 2 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>닉네임을 설정해주세요</Text>
          <Text style={styles.subtitle}>닉네임은 변경할 수 없어요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="닉네임"
              autoCapitalize="none"
              value={nickname.trim()}
              onChangeText={setNickname}
              placeholderTextColor="#999"
              maxLength={8}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                nickname.length > 2
                  ? styles.checkButtonEnabled
                  : styles.checkButtonDisabled,
              ]}
              onPress={handleDuplicateCheck}
              disabled={nickname.length <= 2}>
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          {nicknameMessage && (
            <Text
              style={[
                styles.message,
                isNicknameValid ? styles.successMessage : styles.errorMessage,
              ]}>
              {nicknameMessage}
            </Text>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>비밀번호를 설정해주세요</Text>
          <Text style={styles.subtitle}>
            영문자, 숫자, 특문 조합의 10자 이상 16자 이하여야 합니다.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#BDBDBD"
              secureTextEntry
              autoCapitalize="none"
              value={password.trim()}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={[
                styles.checkButton,
                password.length >= 8
                  ? styles.checkButtonEnabled
                  : styles.checkButtonDisabled,
              ]}
              onPress={handlePasswordCheck}
              disabled={password.length < 8}>
              <Text style={styles.checkButtonText}>확인</Text>
            </TouchableOpacity>
          </View>

          {passwordMessage && (
            <Text
              style={[
                styles.message,
                isPasswordValid ? styles.successMessage : styles.errorMessage,
              ]}>
              {passwordMessage}
            </Text>
          )}
        </View>
      )}

      {step === 4 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>비밀번호를 재확인해주세요</Text>
          <Text style={styles.subtitle}>
            방금 설정한 비밀번호를 다시 입력해주세요!
          </Text>

          {/* 비밀번호 재입력 필드 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 재확인"
              placeholderTextColor="#BDBDBD"
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordCheck}
            />
          </View>

          {/* 비밀번호 재확인 메시지 */}
          {confirmPasswordMessage && (
            <Text
              style={[
                styles.message,
                isConfirmPasswordValid
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}>
              {confirmPasswordMessage}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          (step === 1 && emailValidationResult) ||
          (step === 2 && nicknameValidationResult) ||
          (step === 3 && passwordValidationResult) ||
          (step === 4 && isConfirmPasswordValid)
            ? styles.nextButtonEnabled
            : styles.nextButtonDisabled,
        ]}
        onPress={handleNextStep}
        disabled={
          (step === 1 && !emailValidationResult) ||
          (step === 2 && !nicknameValidationResult) ||
          (step === 3 && !passwordValidationResult) ||
          (step === 4 && !isConfirmPasswordValid)
        }>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  progressDot: {
    fontSize: 12,
    color: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeDot: {
    color: '#5A403D',
  },
  titleContainer: {
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer1: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  checkButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  checkButtonEnabled: {
    backgroundColor: '#8A715D',
  },
  checkButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  checkButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonEnabled: {
    backgroundColor: '#8A715D',
  },
  nextButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginBottom: 24,
  },
  emailMessage: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#5BAF63',
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  message: {marginTop: 10, fontSize: 14, fontWeight: '500'},
  successMessage: {color: '#5BAF63'},
  errorMessage: {color: '#E74C3C'},
});
