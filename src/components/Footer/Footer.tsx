import { useTheme } from '@/context/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text } from 'react-native';
import CategoryScreen from '../../screens/category/CategoryPage';
import HomeScreen from '../../screens/home/HomePage';
import MyScreen from '../../screens/mypage/MyPage';
import RecordScreen from '../../screens/record/Record';
import SearchScreen from '../../screens/search/SearchPage';

const Tab = createBottomTabNavigator();

export default function Footer() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme(); 

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF', 
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused
                ? require('../../assets/image/clickHome.png')
                : require('../../assets/image/home.png');
              break;
            case 'Record':
              iconName = focused
                ? require('../../assets/image/clickRecord.png')
                : require('../../assets/image/record.png');
              break;
            case 'Search':
              iconName = focused
                ? require('../../assets/image/clickSearch.png')
                : require('../../assets/image/search.png');
              break;
            case 'Category':
              iconName = focused
                ? require('../../assets/image/clickCategory.png')
                : require('../../assets/image/category.png');
              break;
            case 'My':
              iconName = focused
                ? require('../../assets/image/clickUser.png')
                : require('../../assets/image/user.png');
              break;
          }

          return (
            <Image
              source={iconName}
              style={[
                styles.logoImage,
                { tintColor: isDarkMode ? '#FFFFFF' : '#8A715D' }, 
              ]}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;

          switch (route.name) {
            case 'Home':
              label = t('홈');
              break;
            case 'Record':
              label = t('기록');
              break;
            case 'Search':
              label = t('검색');
              break;
            case 'Category':
              label = t('카테고리');
              break;
            case 'My':
              label = t('내정보');
              break;
          }

          return (
            <Text
              style={[
                styles.label,
                { color: isDarkMode ? '#FFFFFF' : '#8A715D' },
              ]}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="My" component={MyScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
});
