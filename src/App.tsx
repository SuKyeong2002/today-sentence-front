import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components';
import LandingScreen from './screens/LandingPage';
import LoginScreen from './screens/auth/LoginPage';
import SignUpScreen from './screens/auth/SignUpPage';
import RecordScreen from './screens/main/RecordPage';
import BookSearchScreen from './screens/bookSearch/BookSearchPage';
import EmailFindPage from './screens/auth/EmailFind';
import PasswordFindPage from './screens/auth/PasswordFind';
import NotFoundPage from './screens/NotFound';
import Footer from './components/Footer/Footer';
import SearchPage from './screens/search/SearchPage';

const theme = {
  fonts: {
    light: 'Pretendard-Light',
    medium: 'Pretendard-Medium',
    regular: 'Pretendard-Regular',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
    extraBold: 'Pretendard-ExtraBold',
  },
  fontSizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xLarge: 20,
    title: 24,
  },
  colors: {
    white: '#FFF',
    text: '#262627',
    darkGray: '#828183',
    gray: '#505050',
    lightGray: '#A9A9A9',
    red: '#F33F31',
    green: '#5BAF63',
    primary: '#8A715D',
    secondary: '#B9AA9E',
    secondary2: '#ECD6C4',
    secondary3: '#F8F1E9',
    background: '#F5F4F5',
  },
};

const Stack = createStackNavigator();

const MyNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,  
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={MyNavigationTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={Footer} />
            <Stack.Screen name="Record" component={Footer} />
            <Stack.Screen name="Search" component={Footer} />
            <Stack.Screen name="BookSearch" component={BookSearchScreen} />
            <Stack.Screen name="Category" component={Footer} />
            <Stack.Screen name="My" component={Footer} />
            <Stack.Screen name="EmailFind" component={EmailFindPage} />
            <Stack.Screen name="PasswordFind" component={PasswordFindPage} />
            <Stack.Screen name="NotFound" component={NotFoundPage} />
          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}