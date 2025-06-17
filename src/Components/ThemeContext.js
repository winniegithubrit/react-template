import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [navbarBg, setNavbarBg] = useState('bg-dark');
  const [currentTheme, setCurrentTheme] = useState({ 
    name: 'Black', 
    class: 'bg-dark', 
    color: '#343a40' 
  });

  const themeColors = [
    { name: 'Black', class: 'bg-dark', color: '#343a40' },
    { name: 'Blue', class: 'bg-primary', color: '#0d6efd' },
    { name: 'Grey', class: 'bg-secondary', color: '#6c757d' },
    { name: 'Green', class: 'bg-success', color: '#198754' },
    { name: 'Red', class: 'bg-danger', color: '#dc3545' },
    { name: 'Yellow', class: 'bg-warning', color: '#ffc107' },
    { name: 'Light Blue', class: 'bg-info', color: '#0dcaf0' },
    { name: 'Purple', class: '', color: '#6f42c1' },
    {name:   'Orange', class: '', color: '#FFA500'},
  ];

  const handleThemeChange = (theme) => {
    if (theme.class) {
      setNavbarBg(theme.class);
    } else {
      setNavbarBg('');
    }
    setCurrentTheme(theme);
  };

  const getNavbarStyle = () => {
    if (currentTheme && !currentTheme.class) {
      return { backgroundColor: currentTheme.color };
    }
    return {};
  };

  return (
    <ThemeContext.Provider value={{
      navbarBg,
      currentTheme,
      themeColors,
      handleThemeChange,
      getNavbarStyle
    }}>
      {children}
    </ThemeContext.Provider>
  );
};