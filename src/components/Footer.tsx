import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/home/HomePage';
import RecordScreen from '../screens/main/RecordPage';
import SearchScreen from '../screens/search/SearchPage';
import CategoryScreen from '../screens/category/CategoryPage';
import MyScreen from '../screens/mypage/MyPage';

const Tab = createBottomTabNavigator();

export default function Footer() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
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

          return <Image source={iconName} style={styles.logoImage} />;
        },
        tabBarLabel: ({focused}) => {
          let label;

          switch (route.name) {
            case 'Home':
              label = 'Home';
              break;
            case 'Record':
              label = 'Record';
              break;
            case 'Search':
              label = 'Search';
              break;
            case 'Category':
              label = 'Category';
              break;
            case 'My':
              label = 'My';
              break;
          }

          return <Text style={styles.label}>{label}</Text>;
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
    color: 'gray',
    marginTop: 2,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
});