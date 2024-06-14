import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MainPage } from './Pages/MainPage.jsx';
import { MountainBike } from './Pages/MountainBike.jsx';

const routes = [
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/Mountain-Bike",
        element: <MountainBike />,
      },
    ],
  }
];

const router = createBrowserRouter(routes);

export default router;
