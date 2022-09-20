import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './pages/signup/Signup';
import Login from './pages/login/LoginPage';
import Navbar from './pages/navbar/Navbar';
import AdminPage from './pages/admin/AdminPage';
import Principal from './models/Principal';
import './App.css';

function App() {
  const [principal, setPrincipal] = useState<Principal | null>(null);

  useEffect(() => {
    const data = window.sessionStorage.getItem("user");
    if (data !== null) setPrincipal(JSON.parse(data));
  }, []);

  return (
    <BrowserRouter>
      <Navbar currentUser={principal} />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login currentUser={principal} setCurrentUser={setPrincipal} />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
