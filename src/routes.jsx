import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MainPage } from './Pages/MainPage.jsx';
import { MountainBike } from './Pages/MountainBike.jsx';
import { Ebike } from './Pages/Ebike.jsx';
import { RoadBike } from './Pages/RoadBike.jsx';
import { Trekking } from './Pages/Trekking.jsx';
import { Kids } from './Pages/Kids.jsx';

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
      {
        path: "/E-Bike",
        element: <Ebike />,
      },
      {
        path: "/Road-Bike",
        element: <RoadBike />,
      },
      {
        path: "/Trekking",
        element: <Trekking />,
      },
      {
        path: "/Kids",
        element: <Kids />,
      },
    ],
  }
];

const router = createBrowserRouter(routes);

export default router;
