import React, { useEffect } from 'react';

interface ThemeOverrideProps {
  children: React.ReactNode;
}

const ThemeOverride: React.FC<ThemeOverrideProps> = ({ children }) => {
  useEffect(() => {
    // Force light mode by removing the dark class
    document.documentElement.classList.remove('dark');
    
    // Store the original theme to restore it later
    const originalTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    // Cleanup function to restore original theme when component unmounts
    return () => {
      // We won't restore the theme here because other pages might need it
      // The theme will be applied based on user preference when they navigate to other pages
    };
  }, []);

  return <>{children}</>;
};

export default ThemeOverride;