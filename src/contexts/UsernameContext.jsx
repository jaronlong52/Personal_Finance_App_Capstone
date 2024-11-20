import React, { createContext, useState } from 'react';

// Create a context with a default value of an empty string
export const UsernameContext = createContext();

const UsernameContextProvider = ({ children }) => {
  // State to hold the username
  const [variable, setVariable] = useState('');

  return (
    <UsernameContext.Provider value={{ variable, setVariable }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContextProvider;
