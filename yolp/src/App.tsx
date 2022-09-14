import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/signup/Signup';
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
