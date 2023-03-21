// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AnalyzePage from "./pages/AnalyzePage/AnalyzePage";
import PlayPage from "./pages/PlayPage/PlayPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotFound from "./pages/NotFoundPage/NotFound";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import MyGames from "./components/MyGames/MyGames";
import Assigned from "./components/Assigned/Assigned";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import PgnLoader from "./components/PgnViewer/PgnLoader";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div id="app">
      <Navbar />
      
        <Routes>
          <Route
            exact path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/pgnloader/:id" element={<PgnLoader />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/analyze"
            element={
              <PrivateRoute>
                <AnalyzePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/play"
            element={
              <PrivateRoute>
                <PlayPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mygames"
            element={
              <PrivateRoute>
                <MyGames />
              </PrivateRoute>
            }
          />
          <Route
            path="/assigned"
            element={
              <PrivateRoute>
                <Assigned />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      

      <Footer />
    </div>
  );
}

export default App;
