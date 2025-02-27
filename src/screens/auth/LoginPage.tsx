import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useAuth from '../../hooks/useAuth';

type RootStackParamList = {
  Home: undefined;
  EmailFind: undefined;
  PasswordFind: undefined;
  SignUp: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function LoginPage({navigation}: {navigation: NavigationProp}) {
  const {handleLogin, message} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPasswordState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPress = async () => {
    setIsLoading(true);
    await handleLogin(email, password);
  };

  useEffect(() => {
    if (message) {
      if (message === '로그인 성공!') {
        requestAnimationFrame(() => {
          setTimeout(() => {
            navigation.replace('Home');
          }, 500);
        });
      } else {
        setIsLoading(false);
        Alert.alert('로그인 실패', message);
      }
    }
  }, [message, navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/animation/loading_book.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              당신의 하루를 특별하게 만들어 줄 한 문장
            </Text>
            <Image
              source={require('../../assets/image/NewLogoFrame.png')}
              style={styles.logoImage}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text.trimEnd())}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPasswordState(text.trimEnd())}
          />

          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('EmailFind')}>
              <Text style={styles.footerLinkText}>이메일 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}> | </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordFind')}>
              <Text style={styles.footerLinkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}> | </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerLinkText}>회원가입</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F4F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 12,
    color: '#BDBDBD',
    marginBottom: 5,
  },
  input: {
    color: '#000',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#828282',
  },
  footerDivider: {
    fontSize: 14,
    color: '#BDBDBD',
    marginHorizontal: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    alignSelf: 'center',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8A715D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
});
