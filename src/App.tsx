import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingPage';
import LoginScreen from './screens/auth/LoginPage';
import SignUpScreen from './screens/auth/SignUpPage';
import RecordScreen from './screens/main/RecordPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
