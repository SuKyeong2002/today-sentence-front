import React, {useState} from 'react';
import { Image ,View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export default function LoginPage({ navigation }: { navigation: NavigationProp<any> }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('비밀번호와 이메일이 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fakeLoginApi(email, password);
            Alert.alert("로그인 성공");
        } catch (error) {
            Alert.alert("로그인 실패");
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <Text style={styles.subtitle}>당신의 하루를 특별하게 만들어 줄 한 문장</Text>
      <Image source={require('../../assets/image/LOGO.png')} style={styles.logoImage}/>
      <Button
        title="로그인"
        onPress={() => navigation.navigate('MainPage')} 
      />
      </View>
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor="#BDBDBD"
        keyboardType='email-address'
        autoCapitalize='none'/>
        <TextInput
        style={styles.input}
        placeholder='password'
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        autoCapitalize='none'/>
        <View style={styles.footerLinks}>
        <TouchableOpacity>
          <Text style={styles.footerLinkText}>이메일 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity>
          <Text style={styles.footerLinkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLinkText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
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
      logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5A403D',
      },
      input: {
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
      loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },
      loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
});