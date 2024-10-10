import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isLoginOrSignUpPage = location.pathname === '/Login' || location.pathname === '/Signup';

  return (
    <>
      {!isLoginOrSignUpPage && <Header />}
      
      <Outlet />
      
      {!isLoginOrSignUpPage && <Footer />}
    </>
  );
}

export default App;
