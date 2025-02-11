import React, { createContext, useState, useContext, ReactNode } from 'react';

const FontContext = createContext<{
  selectedFont: string | null;
  setSelectedFont: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

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
