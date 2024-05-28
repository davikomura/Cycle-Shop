import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MainPage } from './components/Pages/MainPage.jsx';

const routes = [
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  }
];

const router = createBrowserRouter(routes);

export default router;
