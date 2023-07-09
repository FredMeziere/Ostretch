import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Stretch from './pages/Stretch';
import Stretches from './pages/Stretches';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Error404 from './pages/Error404/error404';
import MySpace from './pages/MySpace';
import Formulaire from './pages/Contact/Formulaire';
import NewStretch from './pages/NewStretch';
import Footer from './components/Footer/Footer';
import About from './pages/About';


const App = () => {
  const [user, setUser]= useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  console.log(isLogged)
  
  const handleLogin = (item) => {
    setUser(item);
    setIsLogged(true);
    console.log("Connecté");
    if (item.role_id === 1) {
      setIsAdmin(true);
    }
  }
  
const handleLogout = () => {
  setIsLogged(false);
  setUser('');
  setIsAdmin(false);
  localStorage.clear();
}

  return (
    <div className='App'>
      <Navbar isLogged={isLogged} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="about" element={<About />}/>
        <Route path='/stretches' element={<Stretches isLogged={isLogged} isAdmin={isAdmin}/>} />
        <Route path='/stretches/:id' element={<Stretch isAdmin={isAdmin} isLogged={isLogged}/>} />
        <Route path='/login' element={<Login onSubmitLoginForm={handleLogin} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<Formulaire />} />
        {
        isLogged ? <Route path='/my-space' element={<MySpace user={user} setUser={setUser} setIsLogged={setIsLogged} />} /> : <Route path='/my-space' element={<Login />} />
        }
        {
        isAdmin ? <Route path='/new-stretch' element={<NewStretch />} /> : <Route path='/my-space' element={<Login />} />
        }
        <Route path='/*' element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;