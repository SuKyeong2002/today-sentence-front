import {useTheme} from '@/context/ThemeContext';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomModal from '../Modal/CustomModal';
import {useTranslation} from 'react-i18next';

interface CustomHeaderProps {
  showLogo?: boolean;
  onNotificationPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  showLogo,
  onNotificationPress,
}) => {
  const {t} = useTranslation();
  const {isDarkMode, theme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {showLogo && (
          <Image
            source={require('../../assets/image/LOGO2.png')}
            style={[
              styles.LogoIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#8A715D'},
            ]}
          />
        )}
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.coinContainer}>
          <Text
            style={[
              styles.coinText,
              {
                color: isDarkMode ? '#FFFFFF' : '#2B2B2B',
                fontFamily: theme.fontFamily,
              },
            ]}>
            0
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assets/image/coin.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/image/notification.png')}
            style={[
              styles.AlertIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </TouchableOpacity>
        <CustomModal
          visible={modalVisible}
          title={t('오픈 준비중')}
          message={t('곧 이용하실 수 있어요 :)')}
          rightButton={t('확인')}
          onConfirm={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

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
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#262627',
  },
  LogoIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    resizeMode: 'contain',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  AlertIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
