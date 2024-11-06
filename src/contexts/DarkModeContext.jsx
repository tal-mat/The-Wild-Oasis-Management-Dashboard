import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();

// Provider component to manage dark mode state and provide it to children
function DarkModeProvider({ children }) {
  // Use local storage state to manage dark mode preference
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark").matches,
    "isDarkMode",
  );

  // Effect to manage the application's dark mode styles based on the isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Function to toggle dark mode state
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook to use the DarkModeContext
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
