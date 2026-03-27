import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

const App = () => {
  const token = useSelector((state) => state.token);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile/:userId"
          element={token ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
