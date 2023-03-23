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
import PGNViewer from "./components/PgnViewer/PgnViewer";

function App() {
  return (
    <div id="app">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/mygames" element={<MyGames />} />
          <Route exact path="/assigned" element={<Assigned />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/play" element={<PlayPage />} />

          <Route path="/:id" element={<HomePage />} />
          
        </Route>

        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
