import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FontContextProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}

const FontContext = createContext<FontContextProps | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFont, setSelectedFontState] = useState<string>('Pretendard-Regular'); // 기본 폰트

  useEffect(() => {
    const loadFont = async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        console.log(`📌 Loaded Font from Storage: ${storedFont}`);
        setSelectedFontState(storedFont);
      }
    };
    loadFont();
  }, []);

  const setSelectedFont = async (font: string) => {
    console.log(`🔥 Setting Font: ${font}`);
    await AsyncStorage.setItem('selectedFont', font);
    setSelectedFontState(font);
  };

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
