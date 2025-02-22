import useAuth from '@/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import CustomModal from '../Modal/CustomModal';

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
  email?: string;
  changePassword?: string;
  checkChangePassword?: string;
  storedEmail?: string;
  code?: string;
  message?: string;
  isVerified?: boolean;
  isDuplicateChecked?: boolean;
  isError2?: boolean;
  isError3?: boolean;
}

export const ProfileEditHader: React.FC<BackHeaderProps> = ({
  searchKeyword,
  onBackPress,
  nickname,
  email,
  changePassword,
  checkChangePassword,
  storedEmail,
  code,
  message,
  isVerified,
  isDuplicateChecked,
  isError2,
  isError3
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const {t} = useTranslation();
  const {
    handleChangeEmail,
    handleChangeEmail2,
    handleChangeNickname,
    handleChangeStatusMessage,
    handleChangePassword,
  } = useAuth();

  const [localStoredEmail, setLocalStoredEmail] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  useEffect(() => {
    const fetchStoredEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('verifiedEmail');
        console.log('불러온 저장된 이메일:', email);
      } catch (error) {
        console.error('이메일 불러오기 실패:', error);
      }
    };

    fetchStoredEmail();
  }, [isVerified]);

  const handleConfirm = async () => {
    // 닉네임 페이지일 경우
    if (route.name === 'Nickname') {
      if (!nickname || nickname.length === 0) {
        navigation.navigate('Profile');
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        if (!isDuplicateChecked) {
          Alert.alert(t('닉네임 변경 실패'), t('중복검사를 진행해주세요'), [
            {text: t('확인'), style: 'default'},
          ]);
          return;
        }
        await handleChangeNickname(nickname);
        console.log('닉네임 변경 성공');
        navigation.navigate('Profile');
      } catch (error: any) {
        console.error('닉네임 변경 실패:', error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 자기소개 페이지일 경우
    if (route.name === 'Introduction') {
      if (!message || message.length === 0) {
        navigation.navigate('Profile');
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        await handleChangeStatusMessage(message);
        console.log('상태 메시지 변경 성공');
        navigation.navigate('Profile');
      } catch (error: any) {
        console.error('상태 메시지 변경 실패:', error.message);
      } finally {
        setLoading(false);
      }
    }

    // 이메일 페이지일 경우
    if (route.name === 'Email') {
      if (!email || email.length === 0) {
        navigation.navigate('Account');
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        if (!isDuplicateChecked) {
          Alert.alert(t('이메일 변경 실패'), t('중복검사를 진행해주세요'), [
            {text: t('확인'), style: 'default'},
          ]);
          return;
        }
        await handleChangeEmail(email);
        console.log('이메일 인증 페이지로 이동');
        navigation.navigate('Authentication');
      } catch (error: any) {
        console.error('이메일 변경 실패:', error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 이메일 인증 페이지일 경우
    if (route.name === 'Authentication') {
      if (!isVerified || !email) {
        console.log('이메일 변경 시작, 변경할 이메일:', email);
        Alert.alert(t('이메일 변경 실패'), t('이메일 인증을 진행해주세요'), [
          {text: t('확인'), style: 'default'},
        ]);
        return;
      }

      try {
        console.log('이메일 변경 시작, 변경할 이메일:', email);
        await handleChangeEmail2(email);

        await queryClient.invalidateQueries('user');
        await queryClient.refetchQueries('user');

        console.log('이메일 변경 성공:', email);
        navigation.navigate('Profile');
      } catch (error: any) {
        console.error('이메일 변경 실패:', error.message);
      } finally {
        setLoading(false);
      }
    }

    // 비밀번호 페이지일 경우
    if (route.name === 'Password') {
      if (!checkChangePassword || checkChangePassword.length === 0) {
        setModalVisible2(true);
        return;
      }
      
      console.log('비교 값:', changePassword?.trim(), checkChangePassword.trim());
      if (isError3) {
        setModalVisible4(true);
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        if (!isDuplicateChecked) {
          setModalVisible2(true);
          return;
        }
        await handleChangePassword(checkChangePassword);
        console.log('비밀번호 변경 성공');
        navigation.navigate('Profile');
      } catch (error: any) {
        setModalVisible3(true);
      } finally {
        setLoading(false);
      }
      return;
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

      {modalVisible && (
        <CustomModal
          visible={modalVisible}
          title={t('비밀번호 변경 실패')}
          message={t('변경하실 비밀번호를 다시 확인해주세요.')}
          rightButton={t('확인')}
          onConfirm={() => setModalVisible(false)}
        />
      )}

      {modalVisible2 && (
        <CustomModal
          visible={modalVisible2}
          title={t('비밀번호 변경 중단')}
          message={t('확인 시 기존의 비밀번호로 유지됩니다.')}
          leftButton={t('취소')}
          rightButton={t('확인')}
          onCancel={() => setModalVisible2(false)}
          onConfirm={() => {
            navigation.navigate('Account');
          }}
        />
      )}

      {modalVisible3 && (
        <CustomModal
          visible={modalVisible3}
          title={t('비밀번호 변경 실패')}
          message={t(
            '변경하실 비밀번호는 영문자, 숫자, 특문 조합의 10자 이상 16자 이하여야 합니다.',
          )}
          rightButton={t('확인')}
          onConfirm={() => setModalVisible3(false)}
        />
      )}

      {modalVisible4 && (
        <CustomModal
          visible={modalVisible4}
          title={t('비밀번호 변경 실패')}
          message={t('비밀번호가 일치하지 않습니다.')}
          rightButton={t('확인')}
          onConfirm={() => setModalVisible4(false)}
        />
      )}
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
