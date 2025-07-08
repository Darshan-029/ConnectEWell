import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ElderDashboard from "./components/ElderDashboard";
import VapiCall from "./components/VapiCall";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <ElderDashboard /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/vapiCall"
          element={
            isAuthenticated() ? <VapiCall /> : <Navigate to="/register" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
