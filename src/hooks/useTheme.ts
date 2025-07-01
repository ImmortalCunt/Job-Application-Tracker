import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export function useTheme() {
  const { data, updatePreferences } = useApp();

  useEffect(() => {
    if (data.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.preferences.theme]);

  const toggleTheme = () => {
    updatePreferences({
      theme: data.preferences.theme === 'light' ? 'dark' : 'light'
    });
  };

  return {
    theme: data.preferences.theme,
    toggleTheme
  };
}