import React, { Suspense } from 'react';
import Navbar from './components/nav/Navbar';
import './App.css';
import LoadingPage from './pages/loading/LoadingPage';


function App() {
  const Router = React.lazy(() => import("./components/routing/Router"));
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingPage />} >
        <Router />
      </Suspense>
    </>
  );
}

export default App;
