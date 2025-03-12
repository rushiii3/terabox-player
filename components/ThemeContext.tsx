import { useColorScheme } from '@/hooks/useColorScheme';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme colors with more modern palette
export const lightTheme = {
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: '#212529',
  border: '#E9ECEF',
  primary: '#4361EE',
  secondary: '#3F37C9',
  success: '#4CC9F0',
  error: '#F72585',
  inputBackground: '#F8F9FA',
  shadow: 'rgba(0, 0, 0, 0.05)',
  accent: '#4CC9F0',
  muted: '#ADB5BD',
  highlight: '#F8F9FA',
};

export const darkTheme = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#F8F9FA',
  border: '#333333',
  primary: '#4361EE',
  secondary: '#3F37C9',
  success: '#4CC9F0',
  error: '#F72585',
  inputBackground: '#1E1E1E',
  shadow: 'rgba(0, 0, 0, 0.2)',
  accent: '#4CC9F0',
  muted: '#6C757D',
  highlight: '#333333',
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme based on system preference
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};