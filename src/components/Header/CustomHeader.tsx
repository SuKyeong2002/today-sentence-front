import {useTheme} from '@/context/ThemeContext';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface CustomHeaderProps {
  title?: string;
  showLogo?: boolean;
  onNotificationPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showLogo,
  onNotificationPress,
}) => {
  const {isDarkMode} = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {showLogo && (
          <Image
            source={require('../../assets/image/LOGO2.png')}
            style={[
              styles.LogoIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        )}
      </View>

      {!showLogo && <Text style={styles.title}>{title}</Text>}

      <View style={styles.rightContainer}>
        <View style={styles.coinContainer}>
          <Text style={[styles.coinText, {color: isDarkMode ? '#FFFFFF' : '#2B2B2B'}]}>0</Text>
          <TouchableOpacity onPress={() => console.log('Coin icon clicked')}>
            <Image
              source={require('../../assets/image/coin.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onNotificationPress}>
          <Image
            source={require('../../assets/image/notification.png')}
            style={[
              styles.AlertIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </TouchableOpacity>
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
