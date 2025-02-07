import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components';
import LandingScreen from './screens/LandingPage';
import LoginScreen from './screens/auth/LoginPage';
import SignUpScreen from './screens/auth/SignUpPage';
import RecordScreen from './screens/main/RecordPage';
import EmailFindPage from './screens/auth/EmailFind';
import PasswordFindPage from './screens/auth/PasswordFind';
import NotFoundPage from './screens/NotFound';

const theme = {
  fonts: {
    Light: 'Pretendard-Light',
    Medium: 'Pretendard-Medium',
    regular: 'Pretendard-Regular',
    SemiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  },
  fontSizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xLarge: 20,
    title: 24
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Record" component={RecordScreen} />
          <Stack.Screen name="EmailFind" component={EmailFindPage} />
          <Stack.Screen name="PasswordFind" component={PasswordFindPage} />
          <Stack.Screen name="NotFound" component={NotFoundPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
