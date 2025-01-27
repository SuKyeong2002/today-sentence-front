import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFindEmail } from "../../hooks/useFindEmail";
import Loading from "../../components/Loading";

export default function App() {
  const [nickname, setNickname] = useState(""); 
  const { email, isLoading, error, fetchEmail } = useFindEmail();
  const [emailFound, setEmailFound] = useState(false);

  const handleFindEmail = async () => {
    await fetchEmail(nickname);
    setEmailFound(true);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {!isLoading && emailFound ? (
        <View style={styles.emailFoundContainer}>
          <Text style={styles.successIcon}>✔</Text>
          <Text style={styles.emailFoundText}>
            <Text style={styles.bold}>{nickname}</Text>님의 이메일은{"\n"}
            <Text style={styles.bold}>{email}</Text> 입니다.
          </Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              정보 보호를 위해 이메일의 일부만 보여집니다.{"\n"}
              가려지지 않은 전체 이메일은 추가 인증을 통해 확인할 수 있습니다.
            </Text>
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.nicknameContainer}>
          <Text style={styles.title}>닉네임을 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            placeholderTextColor="#aaa"
            value={nickname}
            onChangeText={setNickname}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            style={[
              styles.loginButton,
              nickname.trim()
                ? styles.activeLoginButton
                : styles.disabledLoginButton,
            ]}
            onPress={handleFindEmail}
            disabled={!nickname.trim()}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nicknameContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  activeLoginButton: {
    backgroundColor: "#5A403D",
  },
  disabledLoginButton: {
    backgroundColor: "#E0E0E0",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emailFoundContainer: {
    alignItems: "center",
  },
  successIcon: {
    fontSize: 50,
    color: "#5A403D",
    marginBottom: 20,
  },
  emailFoundText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
