import { useState, useEffect } from "react";

// Custom hook to manage state with localStorage synchronizatio
export function useLocalStorageState(initialState, key) {
  // Initialize state with value from localStorage if available, otherwise use initialState
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Effect to update localStorage whenever the value changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  // Return the current value and the function to update it
  return [value, setValue];
}
