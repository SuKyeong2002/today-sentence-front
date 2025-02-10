import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

export default function PasswordReset() {
  const [temporaryPassword, setTemporaryPassword] = useState(""); // 임시 비밀번호
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const { handleResetPassword, message } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await handleResetPassword(temporaryPassword, newPassword);
      Alert.alert('비밀번호 재설정 성공', message);
    } catch (err) {
      Alert.alert('비밀번호 재설정 실패', message);
    } finally {
      setIsLoading(false);
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
          <Text style={styles.title}>새 비밀번호를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={[
              styles.button,
              temporaryPassword.trim() && newPassword.trim()
                ? styles.activeButton
                : styles.disabledButton,
            ]}
            onPress={handleReset}
            disabled={!temporaryPassword.trim() || !newPassword.trim()}
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
