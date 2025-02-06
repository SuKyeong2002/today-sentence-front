import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { validateEmail, validateNickname, validatePassword } from '../../utils/validation';

export default function SignUpSteps() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text)); // 이메일 유효성 검사
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    setIsNicknameValid(validateNickname(text)); // 닉네임 유효성 검사
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordValid(validatePassword(text)); // 비밀번호 유효성 검사
  };


  const handleNextStep = () => {
    if (step === 1 && isEmailValid) {
      setStep(2); 
    } else if (step === 2 && isNicknameValid) {
      setStep(3); 
    } else if (step === 3 && isPasswordValid) {
      Alert.alert('회원가입 완료', '모든 단계를 완료했습니다!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressDot, step === 1 ? styles.activeDot : null]}>●</Text>
        <Text style={[styles.progressDot, step === 2 ? styles.activeDot : null]}>●</Text>
        <Text style={[styles.progressDot, step === 3 ? styles.activeDot : null]}>●</Text>
      </View>

      {step === 1 && (
        <View>
          <Text style={styles.title}>이메일을 입력해주세요</Text>
          <Text style={styles.subtitle}>6자리의 인증번호를 보내드려요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
            />
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => Alert.alert('중복확인', '이메일 중복 확인')}
            >
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.title}>닉네임을 설정해주세요</Text>
          <Text style={styles.subtitle}>닉네임은 변경할 수 없어요!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="닉네임"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={nickname}
              onChangeText={handleNicknameChange}
            />
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => Alert.alert('중복확인', '닉네임 중복 확인')}
            >
              <Text style={styles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>비밀번호를 설정해주세요</Text>
          <Text style={styles.subtitle}>비밀번호는 8자 이상이어야 합니다.</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          (step === 1 && isEmailValid) ||
          (step === 2 && isNicknameValid) ||
          (step === 3 && isPasswordValid)
            ? styles.nextButtonEnabled
            : styles.nextButtonDisabled,
        ]}
        onPress={handleNextStep}
        disabled={
          (step === 1 && !isEmailValid) ||
          (step === 2 && !isNicknameValid) ||
          (step === 3 && !isPasswordValid)
        }
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
    color: '#888',
    marginBottom: 20,
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
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  checkButtonText: {
    fontSize: 14,
    color: '#666',
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
