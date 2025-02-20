import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useAuth from '@/hooks/useAuth';

type RootStackParamList = {
  Profile: undefined;
  Account: undefined;
  Authentication: undefined;
  Nickname: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface BackHeaderProps {
  searchKeyword?: string;
  onBackPress?: () => void;
  nickname?: string;
}

export const ProfileEditHader: React.FC<BackHeaderProps> = ({
  searchKeyword,
  onBackPress,
  nickname,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { handleChangeNickname } = useAuth(); 

  const handleConfirm = async () => {
    if (!nickname || nickname.length === 0) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      if (route.name === 'Nickname') {
        await handleChangeNickname(nickname); 
        console.log('닉네임 변경 성공');
        navigation.navigate('Profile');
      }
    } catch (error: any) {
      console.error('닉네임 변경 실패:', error.message);
      // setErrorMessage('닉네임 변경 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/image/back2.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.searchText}>{searchKeyword}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handleConfirm}>
          <Text style={styles.confirmButton}>확인</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#262627" />
          <Text style={styles.loadingText}>변경 중...</Text>
        </View>
      )}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  confirmButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
