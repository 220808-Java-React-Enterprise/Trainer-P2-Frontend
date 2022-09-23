import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from './pages/signup/SignupPage';
import LoginPage from './pages/login/LoginPage';
import Navbar from './pages/navbar/Navbar';
import AdminPage from './pages/admin/AdminPage';
import Principal from './models/Principal';
import RestaurantPage from './pages/restaurant/RestaurantPage';
import './App.css';



function App() {
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const data = window.sessionStorage.getItem("user");
    if (data !== null) setPrincipal(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.sessionStorage.getItem("auth-token");
    if (data !== null) setToken(JSON.parse(data));
  }, []);


  return (
    <BrowserRouter>
      <Navbar currentUser={principal} />
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage setCurrentUser={setPrincipal} setToken={setToken} />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/restaurant" element={<RestaurantPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
