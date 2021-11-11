import React from 'react';
// Importing the Context Provider & Home Component
import MyContextProvider from '../../context/MyContext';
import Home from '../Home'
function App() {
  return (
    <MyContextProvider>
        <Home/>
    </MyContextProvider>
  );
}

export default App;