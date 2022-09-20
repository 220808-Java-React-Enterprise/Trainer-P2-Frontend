import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './pages/signup/Signup';
import Login from './pages/login/LoginPage';
import Navbar from './pages/navbar/Navbar';
import User from './models/User';
import AdminPage from './pages/admin/AdminPage';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const data = window.sessionStorage.getItem("user");
    if (data !== null) setUser(JSON.parse(data));
  }, []);

  return (
    <BrowserRouter>
      <Navbar currentUser={user} />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login currentUser={user} setCurrentUser={setUser} />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
