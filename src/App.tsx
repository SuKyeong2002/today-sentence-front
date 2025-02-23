import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components';
import LandingScreen from './screens/LandingPage';
import LoginScreen from './screens/auth/LoginPage';
import SignUpScreen from './screens/auth/SignUpPage';
import RecordScreen from './screens/record/Record';
import BookSearchScreen from './screens/bookSearch/BookSearchPage';
import categoryBookSearchScreen2 from './screens/bookSearch2/categoryBookSearch';
import EmailFindPage from './screens/auth/EmailFind';
import PasswordFindPage from './screens/auth/PasswordFind';
import NotFoundPage from './screens/NotFound';
import StatsContent from "./components/Record/StatusContent";
import Footer from './components/Footer/Footer';
import SettingScreen from './screens/setting/SettingPage';
import NewsScreen from './screens/news/NewsPage';
import SavedContent from './components/Record/SavedContent';
import AlertScreen from './screens/alert/AlertPage';
import RecordContent from './components/Record/RecordContent';
import ScreenScreen from './screens/screen/ScreenPage';
import FontScreen from './screens/font/FontPage';
import ProfileScreen from './screens/profile/ProfilePage';
import NicknameScreen from './screens/nickname/NicknamePage';
import IntroductionScreen from './screens/introduction/IntroductionPage';
import AccountScreen from './screens/account/AccountPage';
import EmailScreen from './screens/email/EmailPage';
import PasswordScreen from './screens/password/PasswordPage';
import AuthenticationScreen from './screens/authentication/AuthenticationPage';
import i18n from './i18n';
import {I18nextProvider} from 'react-i18next';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProviderWrapper} from '@/context/ThemeContext';
import {FontProvider} from './context/FontContext';
import {lightTheme} from '@/styles/theme';
import {QueryClient, QueryClientProvider} from 'react-query';

const theme = {
  fonts: {
    light: 'PretendardLight',
    medium: 'PretendardMedium',
    regular: 'PretendardRegular',
    semiBold: 'PretendardSemiBold',
    bold: 'PretendardBold',
    extraBold: 'PretendardExtraBold',
    default: 'PretendardRegular',
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
    gray: '#50505055',
    lightGray: '#A9A9A9',
    red: '#F33F31',
    green: '#5BAF63',
    blue: '#0E77EA',
    primary: '#8A715D',
    secondary: '#B9AA9E',
    secondary2: '#ECD6C4',
    secondary3: '#F8F1E9',
    background: '#F5F4F5',
  },
  fontFamily: 'PretendardRegular',
};

const MyNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
  },
};

const queryClient = new QueryClient();

  type RootStackParamList = {
    Landing: undefined;
    EmailFind: undefined;
    PasswordFind: undefined;
    SearchFooter: undefined;
    NotFound: undefined;
    SavedContent: undefined;
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    StatusContent: undefined;
    Record: undefined;
    Search: undefined;
    BookSearch: undefined;
    categoryBookSearch: { category: string };
    BookSearch3: undefined;
    BookSearch4: undefined;
    Category: undefined;
    RecordFooter: undefined;
    CategorySearch: undefined;
    My: undefined;
    Setting: undefined;
    News: undefined;
    Alert: undefined;
    Screen: undefined;
    RecordContent: undefined;
    Font: undefined;
    Profile: undefined;
    Nickname: undefined;
    Introduction: undefined;
    Account: undefined;
    Email: undefined;
    Password: undefined;
    Authentication: undefined;
  };
  
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [language, setLanguage] = useState(i18n.language);
  const [font, setFont] = useState(lightTheme.fontFamily);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        await i18n.changeLanguage(storedLang);
        setLanguage(storedLang);
      }
    };
    loadLanguage();
  }, []);

  const appTheme = {
    ...lightTheme,
    fontFamily: font,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProviderWrapper>
          <ThemeProvider theme={appTheme}>
            <FontProvider>
              <NavigationContainer theme={MyNavigationTheme}>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
                  <Stack.Screen name="Landing" component={LandingScreen} />
                  <Stack.Screen name="EmailFind" component={EmailFindPage} />
                  <Stack.Screen
                    name="PasswordFind"
                    component={PasswordFindPage}
                  />
                  <Stack.Screen name="StatusContent" component={StatsContent}/>
                  <Stack.Screen name="RecordContent" component={RecordContent}/>
                  <Stack.Screen name="NotFound" component={NotFoundPage} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                  <Stack.Screen name="Home" component={Footer} />
                  <Stack.Screen name="RecordFooter" component={Footer} />
                  <Stack.Screen name="SearchFooter" component={Footer} />
                  <Stack.Screen
                    name="BookSearch"
                    component={BookSearchScreen}
                  />
                  <Stack.Screen
                    name="categoryBookSearch"
                    component={categoryBookSearchScreen2}
                  />
                  <Stack.Screen name="Category" component={Footer} />
                  <Stack.Screen name="My" component={Footer} />
                  <Stack.Screen name="Setting" component={SettingScreen} />
                  <Stack.Screen name="Alert" component={AlertScreen} />
                  <Stack.Screen name="Screen" component={ScreenScreen} />
                  <Stack.Screen name="Record" component={RecordScreen}/>
                  <Stack.Screen name="SavedContent" component={SavedContent}/>
                  <Stack.Screen name="Font" component={FontScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Nickname" component={NicknameScreen} />
                  <Stack.Screen
                    name="Introduction"
                    component={IntroductionScreen}
                  />
                  <Stack.Screen name="Account" component={AccountScreen} />
                  <Stack.Screen name="Email" component={EmailScreen} />
                  <Stack.Screen name="Password" component={PasswordScreen} />
                  <Stack.Screen
                    name="Authentication"
                    component={AuthenticationScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </FontProvider>
          </ThemeProvider>
        </ThemeProviderWrapper>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
