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
import AllRaces from './Pages/AllRaces'
import Community from './Pages/Community'
import Screener from './Pages/Screener'
import Watchlistpage from './Pages/Watchlistpage'
import Notification from './Pages/Notification'
import Chat from './Pages/Chat'
import Learn from './Pages/Learn'
import StockComparison from './Pages/StockComparison'
import Market from './Pages/Market'
import SingleStock from './Pages/SingleStock'
import StockMarketTable from './Pages/StockMarketTable'
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
                <Route path="/community" element={<Community />} />
                <Route path="/screener" element={<Screener />} />
                <Route path="/watchlist" element={<Watchlistpage />} />
                <Route path="/userprofile/:user_id" element={<IndiUserProfile />} />

                <Route path="/notifications" element={<Notification />} />
                <Route path="/chat" element={<Chat />} />
                <Route path='/learn' element={<Learn/>}/>
                <Route path='/stockComparison' element={<StockComparison/>}/>
                <Route path='/market' element={<Market/>}/>
                <Route path='/singleStock' element={<SingleStock/>}/>
                <Route path='/stockTable' element={<StockMarketTable/>}/>
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/allraces" element={<AllRaces />} />
              {/* <Route path="*" element={<ErrorPage />} /> */}
              <Route path="*" element={<NavFootWrapper />} >
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </GlobalProvider>
        </DarkModeProvider >
      </ErrorBoundary>
    </>
  )
}

export default App
