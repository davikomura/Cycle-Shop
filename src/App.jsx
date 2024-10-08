import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const location = useLocation();

  // Verifica se a rota atual é a de login
  const isLoginPage = location.pathname === '/Login';

  return (
    <>
      {/* Exibe o Header apenas se não estiver na página de login */}
      {!isLoginPage && <Header />}
      
      <Outlet />
      
      {/* Exibe o Footer apenas se não estiver na página de login */}
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
