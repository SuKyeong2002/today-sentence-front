import {findPassword} from '@/api/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation} from 'react-query';
import {useTheme} from 'styled-components';
import LottieView from 'lottie-react-native';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function PasswordFind() {
  const navigation = useNavigation<NavigationProp>();
  const {isDarkMode} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 비밀번호 찾기
  const findPasswordMutation = useMutation(
    async (email: string) => {
      return await findPassword(email);
    },
    {
      onSuccess: response => {
        console.log('비밀번호 찾기 성공:', response);
        if (typeof response.data === 'string') {
          setPassword(response.data);
          setErrorMessage('');
        } else {
          setPassword(null);
          setErrorMessage('비밀번호를 찾을 수 없습니다.');
        }
      },
      onError: (error: any) => {
        console.error('비밀번호 찾기 실패:', error.message);
        setPassword(null);
        setErrorMessage('비밀번호를 찾을 수 없습니다.');
      },
    },
  );

  // 비밀번호 찾기 버튼 클릭 시 실행
  const handleFindPasswordRequest = () => {
    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    findPasswordMutation.mutate(email, {
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.cancelIcon}>
        <Image
          source={require('../../assets/image/cancel.png')}
          style={{
            tintColor: isDarkMode ? '#FFFFFF' : '#2A343D',
            width: 24,
            height: 24,
          }}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        {isLoading ? (
          <LottieView
            source={require('../../assets/animation/loading_search.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        ) : password ? (
          <View style={styles.emailFoundContainer}>
            <Image
              source={require('../../assets/image/login_search_success.png')}
              style={[
                styles.backIcon,
                {tintColor: isDarkMode ? '#FFFFFF' : '#23C16D'},
              ]}
            />
            <Text style={styles.emailFoundText}>
              <Text>{email}</Text>님{'\n'}
              <Text style={{color: isDarkMode ? '#FFFFFF' : '#8A715D'}}>
                {password}
              </Text>{' '}
              되었습니다.
            </Text>
          </View>
        ) : (
          <View style={styles.nicknameContainer}>
            <Text
              style={[styles.title, {color: isDarkMode ? 'white' : 'text'}]}>
              이메일을 입력해주세요
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: isDarkMode ? '#2B2B2B' : 'white'},
              ]}
              placeholder="이메일"
              placeholderTextColor={isDarkMode ? '#D3D3D3' : '#828183'}
              value={email}
              onChangeText={text => setEmail(text.trimEnd())}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        )}
      </View>

      {/* 확인 버튼 & 로그인 버튼 */}
      <View style={styles.buttonContainer}>
        {password ? (
          <TouchableOpacity
            style={[styles.loginButton, styles.activeLoginButton]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.loginButton,
              email.trim()
                ? styles.activeLoginButton
                : styles.disabledLoginButton,
            ]}
            onPress={handleFindPasswordRequest}
            disabled={!email.trim()}>
            <Text style={styles.loginButtonText}>다음</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nicknameContainer: {
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignSelf: 'center',
  },
  loginButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeLoginButton: {
    backgroundColor: '#8A715D',
  },
  disabledLoginButton: {
    backgroundColor: '#50505055',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  emailFoundContainer: {
    alignItems: 'center',
  },
  cancelIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  backIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  emailFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
