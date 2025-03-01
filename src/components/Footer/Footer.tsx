import { useTheme } from '@/context/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import CategoryScreen from '../../screens/category/CategoryPage';
import HomeScreen from '../../screens/home/HomePage';
import MyScreen from '../../screens/mypage/MyPage';
import RecordScreen from '../../screens/record/Record';
import SearchScreen from '../../screens/search/SearchPage';

const Tab = createBottomTabNavigator();

export default function Footer() {
  const {isDarkMode} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused
                ? require('../../assets/image/clickHome.png')
                : isDarkMode
                  ? require('../../assets/image/dark_home.png')
                  : require('../../assets/image/home.png');
              break;
            case 'Record':
              iconName = focused
                ? require('../../assets/image/clickRecord.png')
                : isDarkMode
                  ? require('../../assets/image/dark_record.png')
                  : require('../../assets/image/record.png');
              break;
            case 'Search':
              iconName = focused
                ? require('../../assets/image/clickSearch.png')
                : isDarkMode
                  ? require('../../assets/image/dark_search.png')
                  : require('../../assets/image/search.png');
              break;
            case 'Category':
              iconName = focused
                ? require('../../assets/image/clickCategory.png')
                : isDarkMode
                  ? require('../../assets/image/dark_category.png')
                  : require('../../assets/image/category.png');
              break;
            case 'My':
              iconName = focused
                ? require('../../assets/image/clickUser.png')
                : isDarkMode
                  ? require('../../assets/image/dark_user.png')
                  : require('../../assets/image/user.png');
              break;
          }

          return <Image source={iconName} style={styles.logoImage} />;
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
  logoImage: {
    marginTop: 10,
    width: 26,
    height: 26,
  },
});
