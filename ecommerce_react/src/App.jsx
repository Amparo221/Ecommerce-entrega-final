import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import app from './components/firebase';

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
    let lastScroll = 0;

    
    const controlNavbar = () => {
        if (window.scrollY > lastScroll) {
            
            setShowNavbar(false);
        } else {
           
            setShowNavbar(true);
        }
        lastScroll = window.scrollY; 
        
    };


    const database = app
    console.log(database)




    useEffect(() => {
       
        window.addEventListener('scroll', controlNavbar);

        
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

  return (
   
      <Router>
        <div>
          <nav className={`navbar ${!showNavbar ? 'navbar-hidden' : ''}`}>
          <ul>
            <li><Link className='link-style' to="/components/Login">Login</Link></li>
            <li><Link className='link-style' to="/components/SignUp">Sign Up</Link></li>
          </ul>
        </nav>
          
        <Routes>
        <Route path="/" element={<Products />} />
          <Route path="/components/Login" element={<Login />} />
          <Route path="/components/SignUp" element={<SignUp />} /> 
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
