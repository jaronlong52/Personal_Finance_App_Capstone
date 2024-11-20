import React, { useEffect, createContext, useState } from 'react';

// Create a context with a default value of an empty string
export const UsernameContext = createContext();

const UsernameContextProvider = ({ children }) => {
  // State to hold the username
  const [variable, setVariable] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername || ''; // Default to empty if nothing is saved
  });

  useEffect(() => {
    if (variable) {
      localStorage.setItem('username', variable); // Persist username to localStorage
    }
  }, [variable]); // Run this effect whenever `variable` changes

  return (
    <UsernameContext.Provider value={{ variable, setVariable }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContextProvider;
