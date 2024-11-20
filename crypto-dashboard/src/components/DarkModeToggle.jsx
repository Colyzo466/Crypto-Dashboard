import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 border rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
