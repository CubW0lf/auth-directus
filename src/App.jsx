import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { userContext } from "./contexts/userContext.js";
import { ProtectedRoute } from "./protected/ProtectedRoute.js";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Rules from "./pages/Rules/Rules";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile.jsx";
import Game from "./pages/Game/Game";
import api from "./services/api.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log("intercepted", error);
        const originalRequest = error.config;
        if (error.config.url !== "auth/refresh" && error.status === 401 && originalRequest._retry !== true) {
          originalRequest._retry = true;
          if (refresh && refresh !== "") {
            await api
              .post("auth/refresh", { refresh_token: refresh })
              .then((response) => {
                api.defaults.headers.common["authorization"] = `Bearer ${response.data.access_token}`;
                originalRequest.headers["authorization"] = `Bearer ${response.data.access_token}`;
                setRefresh(response.data.refresh_token);
              })
              .catch((err) => {
                console.log("erreur d'interception", err);
                setRefresh(null);
                setIsAuthenticated(false);
              });
            return api(originalRequest);
          }
        }
      }
    );
  }, [refresh]);

  return (
    <userContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, refresh, setRefresh }}>
      <Navbar />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="player" element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="game/:id" element={<Game />} />
          </Route>
        </Routes>
      </main>
    </userContext.Provider>
  );
}

export default App;
