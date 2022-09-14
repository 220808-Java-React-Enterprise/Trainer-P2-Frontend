import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './components/signup/Signup';
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
