import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './components/signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={ <Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
