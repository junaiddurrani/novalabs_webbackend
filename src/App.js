import './App.css';
import React, { useEffect, useState } from "react";
import NavBar from './components/Navbar';
import AuthService from './services/auth-service';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Request from './components/Request';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
    
      <Router>
        <NavBar currentUser={currentUser} />
        <Routes>
          <Route path='/' element={currentUser ? <Home/> : <Login/>}/>
          <Route exact path='/request' element={currentUser ? <Request/> : <Login/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
        </Router>
    </>
  );
}

export default App;