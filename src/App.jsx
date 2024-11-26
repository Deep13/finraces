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
// import Lenis from 'lenis'

function App() {


  // useEffect(() => {
  //   const lenis = new Lenis({
  //     autoRaf: true,
  //   });

  //   // Listen for the scroll event and log the event data
  //   lenis.on('scroll', (e) => {
  //     console.log(e);
  //   })
  // })

  return (
    <>
      <ErrorBoundary fallback={<Fallback />}>
        <GlobalProvider>
          <Routes>
            <Route path='/' element={<NavFootWrapper />}>
              <Route path="" element={<Home />} />
              <Route path="race/:race_id" element={<RacePage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </GlobalProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
