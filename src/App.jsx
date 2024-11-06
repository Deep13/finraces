import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import NavFootWrapper from './Components/layouts/NavFootWrapper'
import GlobalProvider from './Contexts'

function App() {

  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path='/' element={<NavFootWrapper />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </GlobalProvider>
    </>
  )
}

export default App
