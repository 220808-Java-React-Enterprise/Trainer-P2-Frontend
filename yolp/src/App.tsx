import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';
import Router from './components/routing/Router';
import Navbar from './components/nav/Navbar';
import './App.css';


function App() {
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
