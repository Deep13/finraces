import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import NavFootWrapper from "./Components/layouts/NavFootWrapper";
import GlobalProvider from "./Contexts";
import RacePage from "./Pages/RacePage";
import RacePage1 from "./Pages/RacePage1";
import Profile from "./Pages/Profile";
import Leaderboard from "./Pages/Leaderboard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./Pages/ErrorPage";
import Fallback from "./Components/Fallback";
import DarkModeProvider from "./Contexts/DarkModeProvider";
import { CommunityProvider } from "./Contexts/CommunityProvider";
import { SocketProvider } from "./Contexts/SocketProvider";
import Settings from "./Pages/Settings";
import IndiUserProfile from "./Pages/IndiUserProfile";
import AllRaces from "./Pages/AllRaces";
import Community from "./Pages/Community";
import Screener from "./Pages/Screener";
import Watchlistpage from "./Pages/Watchlistpage";
import Notification from "./Pages/Notification";
import Chat from "./Pages/Chat";
import Learn from "./Pages/Learn";
import StockComparison from "./Pages/StockComparison";
import Market from "./Pages/Market";
import SingleStock from "./Pages/SingleStock";
import StockMarketTable from "./Pages/StockMarketTable";
import PostDetailed from "./Pages/PostDetailed";
// import Lenis from 'lenis'
import Policy from "./Pages/Policy";
import Terms from "./Pages/Terms";
import HowToUseFinraces from "./Pages/HowToUse";
import Blogs from "./Pages/Blogs";
import WriteBlog from "./Pages/WriteBlog";
import AllBlogs from "./Pages/AllBlogs";
import SingleBlog from "./Pages/SingleBlog";
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-ZHYKD0HBSQ");
    ReactGA.send("pageview");
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<Fallback />}>
        <DarkModeProvider>
          <GlobalProvider>
            <CommunityProvider>
              <SocketProvider>
                <Routes>
                  <Route path="/" element={<NavFootWrapper />}>
                    <Route path="" element={<Home />} />
                    <Route path="race/:race_id" element={<RacePage />} />
                    <Route path="race1/:race_id" element={<RacePage1 />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/screener" element={<Screener />} />
                    <Route path="/watchlist" element={<Watchlistpage />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/post/:post_id" element={<PostDetailed />} />
                    <Route
                      path="/userprofile/:user_id"
                      element={<IndiUserProfile />}
                    />
                    <Route path="/policy" element={<Policy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route
                      path="/how_to_use_finraces"
                      element={<HowToUseFinraces />}
                    />

                    <Route path="/notifications" element={<Notification />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route
                      path="/stockComparison"
                      element={<StockComparison />}
                    />
                    <Route path="/market" element={<Market />} />
                    <Route
                      path="/stock/:ticker/:id"
                      element={<SingleStock />}
                    />
                    <Route path="/stockTable" element={<StockMarketTable />} />
                    <Route path="/write_blogs" element={<WriteBlog />} />
                    <Route path="/allBlogs" element={<AllBlogs />} />
                    <Route path="/blog/:id" element={<SingleBlog />} />
                  </Route>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/allraces" element={<AllRaces />} />
                  {/* <Route path="*" element={<ErrorPage />} /> */}
                  <Route path="*" element={<NavFootWrapper />}>
                    <Route path="*" element={<Home />} />
                  </Route>
                </Routes>
              </SocketProvider>
            </CommunityProvider>
          </GlobalProvider>
        </DarkModeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
