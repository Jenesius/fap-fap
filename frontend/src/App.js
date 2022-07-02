import './App.css';
import LoginPage from "./components/login-page";
import Profile from "./components/profile";
import "./assets/css/index.css";
import {Route, Routes} from "react-router-dom";
import GamePage from "./components/game-page";


function App() {
  return (
      <div className = "app-content">
          <Routes>
              <Route path = "/auth" element={<LoginPage/>}/>
              <Route path = "/profile" element={<Profile/>}/>
              <Route path = "/game" element={<GamePage/>}/>
          </Routes>
      </div>
  );
}

export default App;
