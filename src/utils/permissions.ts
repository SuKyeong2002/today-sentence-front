import { PermissionsAndroid, Platform } from 'react-native';

export const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: '갤러리 접근 권한 요청',
          message: '프로필 사진을 변경하려면 갤러리 접근이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('갤러리 접근 권한 허용됨');
        return true;
      } else {
        console.log('갤러리 접근 권한 거부됨');
        return false;
      }
    } catch (err) {
      console.error('권한 요청 실패:', err);
      return false;
    }
  }
  return true; // iOS는 기본적으로 접근 가능
};
