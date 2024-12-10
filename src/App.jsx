import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import NavFootWrapper from './Components/layouts/NavFootWrapper'
import GlobalProvider from './Contexts'
import RacePage from './Pages/RacePage'
import Profile from './Pages/Profile'
import Leaderboard from './Pages/Leaderboard'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './Pages/ErrorPage'
import Fallback from './Components/Fallback'
import DarkModeProvider from './Contexts/DarkModeProvider'
import Settings from './Pages/Settings'
import IndiUserProfile from './Pages/IndiUserProfile'
// import Lenis from 'lenis'

function App() {


  return (
    <>
      <ErrorBoundary fallback={<Fallback />}>
        <DarkModeProvider>
          <GlobalProvider>
            <Routes>
              <Route path='/' element={<NavFootWrapper />}>
                <Route path="" element={<Home />} />
                <Route path="race/:race_id" element={<RacePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/userprofile" element={<IndiUserProfile />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </GlobalProvider>
        </DarkModeProvider >
      </ErrorBoundary>
    </>
  )
}

export default App
