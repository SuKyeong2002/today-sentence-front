import { deleteAccount } from '@/api/deleteAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';

type RootStackParamList = {
  Login: undefined;
};

export const useDeleteAccount = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return useMutation(deleteAccount, {
    onSuccess: async () => {
      try {
        await AsyncStorage.clear();

        Alert.alert('회원탈퇴 완료', '계정이 삭제되었습니다.', [
          {text: '확인', onPress: () => navigation.replace('Login')},
        ]);
      } catch (error) {
        console.error('회원탈퇴 후 토큰 삭제 오류:', error);
      }
    },
    onError: error => {
      Alert.alert('회원탈퇴 실패', '다시 시도해주세요.');
      console.error('회원탈퇴 요청 중 오류:', error);
    },
  });
};
