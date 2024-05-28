import React, { useState } from 'react'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
