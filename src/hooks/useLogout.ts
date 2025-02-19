import { useMutation } from "react-query";
import { logout } from "@/api/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined; 
};

export const useLogout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return useMutation(logout, {
    onSuccess: async () => {
      try {
        await AsyncStorage.removeItem("accessToken"); 
        await AsyncStorage.removeItem("refreshToken");
        
        Alert.alert("로그아웃 성공", "로그아웃되었습니다.", [
          { text: "확인", onPress: () => navigation.replace("Login") },
        ]);
      } catch (error) {
        console.error("로그아웃 후 토큰 삭제 오류:", error);
      }
    },
    onError: (error) => {
      Alert.alert("로그아웃 실패", "다시 시도해주세요.");
      console.error("로그아웃 요청 중 오류:", error);
    },
  });
};
