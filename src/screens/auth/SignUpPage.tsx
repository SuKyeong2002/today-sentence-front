import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import checkEmailValidation from '../../hooks/useEmailValidation';
import usePasswordValidation from '../../hooks/usePasswordValidation';
import useNickNameValidation from '../../hooks/useNicknameValidation';

export default function SignUpSteps() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  
  // ✅ 커스텀 훅 사용
  const { validationResult: emailValidationResult, validateEmail } = checkEmailValidation();
  const { validationResult: nicknameValidationResult, validateNickname } = useNickNameValidation();
  const { validationResult: passwordValidationResult, validatePassword } = usePasswordValidation();

  // ✅ 이메일 검증
  const handleEmailCheck = async () => {
    if (!email.includes('@')) {
      Alert.alert('오류', '유효한 이메일을 입력하세요.');
      return;
    }
    await validateEmail(email);
    if (emailValidationResult) {
      Alert.alert('확인 완료', '사용 가능한 이메일입니다.');
    } else {
      Alert.alert('중복된 이메일', '이미 존재하는 이메일입니다.');
    }
  };

  // ✅ 닉네임 검증
  const handleNicknameCheck = async () => {
    if (nickname.length < 3) {
      Alert.alert('오류', '닉네임은 3자 이상이어야 합니다.');
      return;
    }
    await validateNickname(nickname);
    if (nicknameValidationResult) {
      Alert.alert('확인 완료', '사용 가능한 닉네임입니다.');
    } else {
      Alert.alert('중복된 닉네임', '이미 존재하는 닉네임입니다.');
    }
  };

  // ✅ 비밀번호 검증
  const handlePasswordCheck = async () => {
    if (password.length < 8) {
      Alert.alert('오류', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    await validatePassword(password);
  };

  // ✅ 회원가입 단계 진행
  const handleNextStep = () => {
    if (step === 1 && emailValidationResult) {
      setStep(2);
    } else if (step === 2 && nicknameValidationResult) {
      setStep(3);
    } else if (step === 3 && passwordValidationResult) {
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
              <Text style={styles.checkButtonText}>중복확인</Text>
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
              onPress={handleNicknameCheck}
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
            onPress={handlePasswordCheck}
            disabled={password.length < 8}
          >
            <Text style={styles.checkButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
        <View>
          <Text style={styles.title}>비밀번호를 재확인해주세요</Text>
          <Text style={styles.title}>방금 설정한 비밀번호를 다시 입력해주세요!</Text>
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
            onPress={handlePasswordCheck}
            disabled={password.length < 8}
          >
            <Text style={styles.checkButtonText}>확인</Text>
          </TouchableOpacity>
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
  subtitle: {
    fontSize: 14,
    color: '#505050',
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
    backgroundColor: '#FFF',
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

