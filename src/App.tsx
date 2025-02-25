import {ThemeProviderWrapper} from '@/context/ThemeContext';
import {lightTheme} from '@/styles/theme';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider} from 'styled-components';
import Footer from './components/Footer/Footer';
import {FontProvider, useFont} from './context/FontContext';
import i18n from './i18n';
import AccountScreen from './screens/account/AccountPage';
import AlertScreen from './screens/alert/AlertPage';
import EmailFindPage from './screens/auth/EmailFind';
import LoginScreen from './screens/auth/LoginPage';
import PasswordFindPage from './screens/auth/PasswordFind';
import SignUpScreen from './screens/auth/SignUpPage';
import AuthenticationScreen from './screens/authentication/AuthenticationPage';
import BookSearchScreen from './screens/bookSearch/BookSearchPage';
import CategoryBookSearchScreen2 from './screens/bookSearch2/categoryBookSearch';
import EmailScreen from './screens/email/EmailPage';
import BookDetailScreen from './components/Record/BookDetail';
import FontScreen from './screens/font/FontPage';
import IntroductionScreen from './screens/introduction/IntroductionPage';
import LandingScreen from './screens/LandingPage';
import NewsScreen from './screens/News/NewsPage';
import NicknameScreen from './screens/nickname/NicknamePage';
import NotFoundPage from './screens/NotFound';
import PasswordScreen from './screens/password/PasswordPage';
import ProfileScreen from './screens/profile/ProfilePage';
import BookWrite from "./components/Record/BookWrite";
import ScreenScreen from './screens/screen/ScreenPage';
import SettingScreen from './screens/setting/SettingPage';
import RecordContentScreen from './components/Record/RecordContent';
import RecordSearchScreen from './components/Record/RecordSearch';
import RecordBookListScreen from './screens/recordBookList/RecordBookListPage';
import BookmarkBookListScreen from './screens/bookmarkBookList/BookmarkBookListPage';
import SavedContentScreen from './components/Record/SavedContent';
import StatusContentScreen from './components/Record/StatusContent';

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
    white: '#FFFFF',
    text: '#2B2B2B',
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
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Record: undefined;
  BookDetail: { postId: string };
  Search: undefined;
  BookSearch: undefined;
  CategoryBookSearch: {category: string};
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
  Font: undefined;
  Profile: undefined;
  Nickname: undefined;
  BookWrite: undefined;
  Introduction: undefined;
  Account: undefined;
  Email: undefined;
  Password: undefined;
  Authentication: undefined;
  RecordContent: undefined;
  RecordBookList: undefined;
  RecordSearch: undefined;
  SavedContent: undefined;
  StatusContent: undefined;
  BookmarkBookList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <FontProvider>
          <ThemeProviderWrapper>
            <ThemedApp />
          </ThemeProviderWrapper>
        </FontProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

function ThemedApp() {
  const [language, setLanguage] = useState(i18n.language);
  const {selectedFont} = useFont();
  const [theme, setTheme] = useState({...lightTheme, fontFamily: selectedFont});

  useEffect(() => {
    console.log(`🟡 Updating Theme with Font: ${selectedFont}`);
    setTheme(prevTheme => ({
      ...prevTheme,
      fontFamily: selectedFont,
    }));
  }, [selectedFont]);

  return (
    <ThemeProvider theme={theme} key={selectedFont}>
      <NavigationContainer theme={MyNavigationTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="EmailFind" component={EmailFindPage} />
          <Stack.Screen name="PasswordFind" component={PasswordFindPage} />
          <Stack.Screen name="NotFound" component={NotFoundPage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={Footer} />
          <Stack.Screen name="BookWrite" component={BookWrite}/>
          <Stack.Screen name="RecordFooter" component={Footer} />
          <Stack.Screen name="Search" component={Footer} />
          <Stack.Screen name="BookSearch" component={BookSearchScreen} />
          <Stack.Screen
            name="CategoryBookSearch"
            component={CategoryBookSearchScreen2}
          />
          <Stack.Screen name="BookDetail" component={BookDetailScreen}/>
          <Stack.Screen name="Category" component={Footer} />
          <Stack.Screen name="My" component={Footer} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Alert" component={AlertScreen} />
          <Stack.Screen name="Screen" component={ScreenScreen} />
          <Stack.Screen name="Record" component={Footer} />
          <Stack.Screen name="RecordContent" component={RecordContentScreen} />
          <Stack.Screen name="RecordSearch" component={RecordSearchScreen} />
          <Stack.Screen
            name="RecordBookList"
            component={RecordBookListScreen}
          />
          <Stack.Screen
            name="BookmarkBookList"
            component={BookmarkBookListScreen}
          />
          <Stack.Screen name="SavedContent" component={SavedContentScreen} />
          <Stack.Screen name="StatusContent" component={StatusContentScreen} />
          <Stack.Screen name="Font" component={FontScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Nickname" component={NicknameScreen} />
          <Stack.Screen name="Introduction" component={IntroductionScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Email" component={EmailScreen} />
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen
            name="Authentication"
            component={AuthenticationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
