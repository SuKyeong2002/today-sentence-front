import {useTheme} from '@/context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomModal from '../Modal/CustomModal';
import {useTranslation} from 'react-i18next';

type RootStackParamList = {
  Search: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

interface BackHeaderProps {
  searchKeyword?: string;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  searchKeyword,
  onBackPress,
  onNotificationPress,
}) => {
  const {t} = useTranslation();
  const {isDarkMode, theme} = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={[
        styles.headerContainer,
        {backgroundColor: isDarkMode ? '#000000' : '#F5F4F5'},
      ]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/image/back2.png')}
            style={[
              styles.backIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.searchText,
            {
              color: isDarkMode ? '#FFFFFF' : '#2B2B2B',
              fontFamily: theme.fontFamily,
            },
          ]}>
          {searchKeyword}
        </Text>
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
              styles.backIcon,
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

export default BackHeader;

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
    gap: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinText: {
    fontSize: 14,
    fontWeight: '600',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
