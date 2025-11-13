import React, { useEffect } from 'react';

interface ThemeOverrideProps {
  children: React.ReactNode;
}

const ThemeOverride: React.FC<ThemeOverrideProps> = ({ children }) => {
  useEffect(() => {
    // Force light mode by removing the dark class
    document.documentElement.classList.remove('dark');
  }, []);

  return <>{children}</>;
};

export default ThemeOverride;