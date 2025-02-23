import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

export default function LoginPage({ navigation }: { navigation: NavigationProp<any> }) {
  const { handleLogin, message } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPasswordState] = useState('');

  const onLoginPress = async () => {
    await handleLogin(email, password);
  };

  console.log("메세지1", message);
  useEffect(() => {
    if (message) {
      if (message === '로그인 성공!') {
        navigation.navigate('Home');
      } else {
        Alert.alert('로그인 실패', message);
      }
    }
  }, [message, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>당신의 하루를 특별하게 만들어 줄 한 문장</Text>
        <Image source={require('../../assets/image/NewLogoFrame.png')} style={styles.logoImage} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPasswordState}
      />
      <View style={styles.footerLinks}>
        <TouchableOpacity onPress={() => navigation.navigate("EmailFind")}>
          <Text style={styles.footerLinkText}>이메일 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordFind")}>
          <Text style={styles.footerLinkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLinkText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    logoImage : {
        justifyContent: 'center',
        padding: 20,
    },
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
        color: "#000",
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
});