import React,{useState,useEffect} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home'
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);
     //send a toast message
     isOnline?toast("You are Online"):toast("You are Offline")
    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
}, [isOnline]);

  return (
    <div className="App">
    <BrowserRouter>
      <NavBar/>
       <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/not" element={<NotFound/>}/>
          <Route
              path="*"
              element={<Navigate to="/not" replace />}
          />
       </Routes>
       <ToastContainer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
