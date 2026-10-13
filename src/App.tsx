import { useLocation } from '@tanstack/react-router';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import { Outlet } from '@tanstack/react-router';

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
