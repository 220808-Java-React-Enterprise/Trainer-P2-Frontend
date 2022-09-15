import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Restaurant from './components/restaurant/Restaurant';
import User from './models/User';
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
        <Route path="/login" element={<Login currentUser={user} updateCurrentUser={setUser} />}></Route>
        <Route path="/restaurant" element={<Restaurant currentUser={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
