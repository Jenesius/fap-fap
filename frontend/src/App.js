import './App.css';
import LoginPage from "./components/login-page";
import "./assets/css/index.css";
import authService from "./assets/js/auth-service";

window.check = authService.checkAuth;
window.testAuth = authService.testAuth;

function App() {
  return (
      <div className = "app-content">
        <LoginPage/>
      </div>
  );
}

export default App;
