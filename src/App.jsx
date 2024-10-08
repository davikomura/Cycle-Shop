import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/Login';

  return (
    <>
      {!isLoginPage && <Header />}
      
      <Outlet />
      
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
