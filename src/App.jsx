import Page_routes from './page_routes';
import React from 'react'
import UsernameContextProvider from './contexts/UsernameContext';

const App = () => {
  return (
    <div>
      <UsernameContextProvider>
        <Page_routes/>
      </UsernameContextProvider>
    </div>
  );
}

export default App
