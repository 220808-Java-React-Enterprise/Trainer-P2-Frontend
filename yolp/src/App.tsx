import React, { Suspense } from 'react';
import Navbar from './components/nav/Navbar';
import './App.css';


function App() {
  const Router = React.lazy(() => import("./components/routing/Router"));
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>} >
        <Router />
      </Suspense>
    </>
  );
}

export default App;
