import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/theme';

// lightTheme과 darkTheme의 타입 정의
type ThemeType = typeof lightTheme | typeof darkTheme;

interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: (mode?: 'light' | 'dark') => void; // 특정 테마를 직접 선택할 수 있도록 수정
}

// ThemeContext 생성
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// ThemeProviderWrapper 컴포넌트
export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 테마 전환 함수 (특정 모드 지정 가능)
  const toggleTheme = (mode?: 'light' | 'dark') => {
    if (mode) {
      setTheme(mode);
    } else {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  };

  // 현재 테마에 따라 lightTheme 또는 darkTheme 적용
  const currentTheme: ThemeType = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// 커스텀 훅: useTheme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper');
  }
  return context;
};
