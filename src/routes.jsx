import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { About } from './Pages/About.jsx';
import { CategoryLanding } from './Pages/CategoryLanding.jsx';
import { Checkout } from './Pages/Checkout.jsx';
import { CheckoutSuccess } from './Pages/CheckoutSuccess.jsx';
import { Ebike } from './Pages/Ebike.jsx';
import { Faq } from './Pages/Faq.jsx';
import { Favorites } from './Pages/Favorites.jsx';
import { Kids } from './Pages/Kids.jsx';
import { MainPage } from './Pages/MainPage.jsx';
import { MountainBike } from './Pages/MountainBike.jsx';
import { PrivacyPolicy } from './Pages/PrivacyPolicy.jsx';
import { ProductDetail } from './Pages/ProductDetail.jsx';
import { RoadBike } from './Pages/RoadBike.jsx';
import { SearchResults } from './Pages/SearchResults.jsx';
import { TermsConditions } from './Pages/TermsConditions.jsx';
import { Trekking } from './Pages/Trekking.jsx';
import { Login } from './components/Auth/Login.jsx';
import { Signup } from './components/Auth/Signup.jsx';
import { Cart } from './components/Cart/Cart.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Signup',
        element: <Signup />,
      },
      {
        path: '/Cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/checkout/success',
        element: <CheckoutSuccess />,
      },
      {
        path: '/Mountain-Bike',
        element: <MountainBike />,
      },
      {
        path: '/E-Bike',
        element: <Ebike />,
      },
      {
        path: '/Road-Bike',
        element: <RoadBike />,
      },
      {
        path: '/Trekking',
        element: <Trekking />,
      },
      {
        path: '/Kids',
        element: <Kids />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/PrivacyPolicy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/product/:productId',
        element: <ProductDetail />,
      },
      {
        path: '/search',
        element: <SearchResults />,
      },
      {
        path: '/Terms-and-Conditions',
        element: <TermsConditions />,
      },
      {
        path: '/FAQ',
        element: <Faq />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/category/:categorySlug',
        element: <CategoryLanding />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
