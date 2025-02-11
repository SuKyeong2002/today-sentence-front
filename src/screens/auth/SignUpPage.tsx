import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import useAuth from '../../hooks/useAuth';

export default function SignUpSteps() {
  const {
    handleVerifiedEmail,
    handleVerifiedNickName,
    handleVerifiedPassword,
    handleSignUp,
    handleSendAuthCode,
    handleVerifyAuthCode,
  } = useAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [emailValidationResult, setEmailValidationResult] = useState(false);
  const [nicknameValidationResult, setNicknameValidationResult] = useState(false);
  const [passwordValidationResult, setPasswordValidationResult] = useState(false);

  const handleEmailCheck = async () => {
    if (!email.includes("@")) {
      Alert.alert("오류", "유효한 이메일을 입력하세요.");
      return;
    }
    try {
      await handleSendAuthCode(email);
      Alert.alert("성공", "인증번호가 이메일로 전송되었습니다.");
      setIsEmailSent(true);
    } catch (error) {
      Alert.alert("오류", "인증번호 전송에 실패했습니다.");
      setIsEmailSent(false);
    }
  };

  useEffect(() => {
    if (isEmailSent) {
      const verifyEmail = async () => {
        try {
          await handleVerifiedEmail(email);
        } catch (error) {
          console.error("이메일 인증 확인 중 오류 발생:", error);
        }
      };
      verifyEmail();
    }
  }, [isEmailSent, email, handleVerifiedEmail]);

  const handleEmailVerification = async () => {
    if (enteredCode.trim() === "") {
      Alert.alert("오류", "유효한 코드를 입력하세요.");
      return;
    }
    try {
      const isCodeValid = await handleVerifyAuthCode(enteredCode);
      if (isCodeValid) {
        setEmailValidationResult(true);
        Alert.alert("성공", "이메일 인증이 완료되었습니다.");
      } else {
        Alert.alert("오류", "인증번호가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 코드 검증 중 오류 발생:", error);
      Alert.alert("오류", "인증 코드 확인 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (nickname.trim() !== "") {
      const verifyNickname = async () => {
        try {
          await handleVerifiedNickName(nickname);
          setNicknameValidationResult(true);
        } catch (error) {
          console.error("닉네임 검증 실패:", error);
          setNicknameValidationResult(false);
        }
      };
      verifyNickname();
    }
  }, [nickname, handleVerifiedNickName]);

  useEffect(() => {
    if (password.trim() !== "") {
      const verifyPassword = async () => {
        try {
          await handleVerifiedPassword(password);
          setPasswordValidationResult(true);
        } catch (error) {
          console.error("비밀번호 검증 실패:", error);
          setPasswordValidationResult(false);
        }
      };
      verifyPassword();
    }
  }, [password, handleVerifiedPassword]);

  useEffect(() => {
    if (password.trim() !== "" && confirmPassword.trim() !== "") {
      if (password !== confirmPassword) {
        Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      }
    }
  }, [password, confirmPassword]);

  const handleNextStep = async () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    else if (step === 4) {
      await handleSignUp(email, nickname, password);
      Alert.alert('회원가입 완료', '모든 단계를 완료했습니다!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressDot, step === 1 ? styles.activeDot : null]}>●</Text>
        <Text style={[styles.progressDot, step === 2 ? styles.activeDot : null]}>●</Text>
        <Text style={[styles.progressDot, step === 3 ? styles.activeDot : null]}>●</Text>
        <Text style={[styles.progressDot, step === 4 ? styles.activeDot : null]}>●</Text>
      </View>

      {step === 1 && (
        <View>
          <Text style={styles.title}>이메일을 입력해주세요</Text>
          <Text style={styles.title}>6자리의 인증번호를 보내드려요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[styles.checkButton, email.includes('@') ? styles.checkButtonEnabled : styles.checkButtonDisabled]}
              onPress={handleEmailCheck}
              disabled={!email.includes('@')}
            >
              <Text style={styles.checkButtonText}>인증번호 보내기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='인증번호 입력'
              placeholderTextColor="#aaa"
              keyboardType='numeric'
              value={enteredCode}
              onChangeText={setEnteredCode}
            />
            <TouchableOpacity
              style={styles.checkButton}
              onPress={handleEmailVerification}
            >
              <Text style={styles.checkButtonText}>인증번호 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.title}>닉네임을 설정해주세요</Text>
          <Text style={styles.title}>닉네임은 변경할 수 없어요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="닉네임"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={nickname}
              onChangeText={setNickname}
            />
            <TouchableOpacity
              style={[styles.checkButton, nickname.length > 2 ? styles.checkButtonEnabled : styles.checkButtonDisabled]}
              onPress={() => {}}
              disabled={nickname.length <= 2}
            >
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>비밀번호를 설정해주세요</Text>
          <Text style={styles.title}>영문자, 숫자, 특문 조합의 10자 이상 16자 이하여야 합니다.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={[styles.checkButton, password.length >= 8 ? styles.checkButtonEnabled : styles.checkButtonDisabled]}
              onPress={() => {}}
              disabled={password.length < 8}
            >
              <Text style={styles.checkButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.title}>비밀번호를 재확인해주세요</Text>
          <Text style={styles.title}>방금 설정한 비밀번호를 다시 입력해주세요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.nextButton, (step === 1 && emailValidationResult) || (step === 2 && nicknameValidationResult) || (step === 3 && passwordValidationResult) ? styles.nextButtonEnabled : styles.nextButtonDisabled]}
        onPress={handleNextStep}
        disabled={(step === 1 && !emailValidationResult) || (step === 2 && !nicknameValidationResult) || (step === 3 && !passwordValidationResult)}
      >
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
    justifyContent: 'center',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
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
    backgroundColor: '#5A403D',
  },
  checkButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  checkButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  nextButton: {
    marginTop: 30,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonEnabled: {
    backgroundColor: '#5A403D',
  },
  nextButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});