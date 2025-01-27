import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { usePasswordReset } from "../../hooks/usePasswordReset";
import Loading from "../../components/Loading";

export default function PasswordReset() {
  const [temporaryPassword, setTemporaryPassword] = useState(""); // 임시 비밀번호
  const { isLoading, error, verifyCode } = usePasswordReset();

  const handleVerifyCode = async () => {
    try {
      await verifyCode(temporaryPassword, "secondArgument");
      Alert.alert("임시 비밀번호가 확인되었습니다. 로그인 가능합니다!");
    } catch (err) {
      Alert.alert("임시 비밀번호가 잘못되었습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Text style={styles.title}>임시 비밀번호를 입력해주세요</Text>
          <Text style={styles.subtitle}>이메일을 확인해주세요!</Text>
          <TextInput
            style={styles.input}
            placeholder="임시 비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={temporaryPassword}
            onChangeText={setTemporaryPassword}
          />
          <TouchableOpacity
            style={[
              styles.button,
              temporaryPassword.trim()
                ? styles.activeButton
                : styles.disabledButton,
            ]}
            onPress={handleVerifyCode}
            disabled={!temporaryPassword.trim()}
          >
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#5A403D",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
