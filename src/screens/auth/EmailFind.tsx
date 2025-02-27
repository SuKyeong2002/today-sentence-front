import {findEmail} from '@/api/auth';
import useAuth from '@/hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
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

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function EmailFind() {
  const navigation = useNavigation<NavigationProp>();
  const {isDarkMode} = useTheme();
  const {handleFindUsername} = useAuth();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 아이디 찾기
  const findEmailMutation = useMutation(
    async (nickname: string) => {
      return await findEmail(nickname);
    },
    {
      onSuccess: response => {
        console.log('아이디 찾기 성공:', response);
        if (typeof response.data === 'string') {
          setEmail(response.data);
          setErrorMessage('');
        } else {
          setEmail(null);
          setErrorMessage('아이디를 찾을 수 없습니다.');
        }
      },
      onError: (error: any) => {
        console.error('아이디 찾기 실패:', error.message);
        setEmail(null);
        setErrorMessage('아이디를 찾을 수 없습니다.');
      },
    },
  );

  // 아이디 찾기 버튼 클릭 시 실행
  const handleFindEmail = () => {
    if (!nickname.trim()) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    findEmailMutation.mutate(nickname, {
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
        ) : email ? (
          <View style={styles.emailFoundContainer}>
            <Image
              source={require('../../assets/image/login_search_success.png')}
              style={[
                styles.backIcon,
                {tintColor: isDarkMode ? '#FFFFFF' : '#23C16D'},
              ]}
            />
            <Text style={styles.emailFoundText}>
              <Text>{nickname}</Text>님의 이메일은{'\n'}
              <Text style={{color: isDarkMode ? '#FFFFFF' : '#8A715D'}}>
                {email}
              </Text>{' '}
              입니다.
            </Text>
            <View style={styles.infoBox}>
              <Image
                source={require('../../assets/image/login_alert_info.png')}
                style={[
                  styles.infoIcon,
                  {tintColor: isDarkMode ? '#FFFFFF' : '#828183'},
                ]}
              />
              <Text
                style={[
                  styles.infoText,
                  {color: isDarkMode ? '#FFFFFF' : 'gray'},
                ]}>
                정보 보호를 위해 이메일의 일부만 보여집니다.{'\n'}
                가려지지 않은 전체 이메일은 추가 인증을 통해 확인할 수 있습니다.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.nicknameContainer}>
            <Text
              style={[styles.title, {color: isDarkMode ? 'white' : 'text'}]}>
              닉네임을 입력해주세요
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: isDarkMode ? '#2B2B2B' : 'white'},
              ]}
              placeholder="닉네임"
              placeholderTextColor={isDarkMode ? '#D3D3D3' : '#828183'}
              value={nickname}
              maxLength={8}
              onChangeText={text => setNickname(text.trimEnd())}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        )}
      </View>

      {/* 확인 버튼 & 로그인 버튼 */}
      <View style={styles.buttonContainer}>
        {email ? (
          <TouchableOpacity
            style={[styles.loginButton, styles.activeLoginButton]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.loginButton,
              nickname.trim()
                ? styles.activeLoginButton
                : styles.disabledLoginButton,
            ]}
            onPress={handleFindEmail}
            disabled={!nickname.trim()}>
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
  infoIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  emailFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    paddingVertical: 26,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
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
