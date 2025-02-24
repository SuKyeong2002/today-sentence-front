import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/theme';
import { useFont } from '@/context/FontContext';

interface ThemeContextType {
  isDarkMode: boolean;
  setThemeMode: (darkMode: boolean) => void;
  theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { selectedFont } = useFont();
  const [theme, setTheme] = useState<typeof lightTheme>(lightTheme); 

  useEffect(() => {
    setTheme(prevTheme => ({
      ...prevTheme,
      fontFamily: selectedFont,
    }));
  }, [selectedFont]);

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('isDarkMode');
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme === 'true');
      }
    })();
  }, []);

  const setThemeMode = async (darkMode: boolean) => {
    setIsDarkMode(darkMode);
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(darkMode));
    setTheme(darkMode ? darkTheme : lightTheme); 
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setThemeMode, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper');
  }
  return context;
};
