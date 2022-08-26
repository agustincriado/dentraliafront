import React from 'react';
import './App.css';
import './Events.css';
import NavBar from './components/pages/NavBar';
import SideBar from './components/pages/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import About from './components/pages/About';
import FAQ from './components/pages/FAQ';
import Newsletter from './components/pages/Newsletter';
import Contact from './components/pages/Contact';
import MakeEvent from './components/pages/MakeEvent';
import Planos from './components/pages/Planos';
import Payment from './components/Payment';
import Gateway from './components/Gateway';
import NotFound from './components/pages/NotFound';
import { AuxProvider } from './context/auxContext';
function App() {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <BrowserRouter>
      {isDesktop ? <NavBar/> : <SideBar/>}
      <div className='contenedor'>
        <AuxProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/events" element={<MakeEvent/>}/>
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/newsletter" element={<Newsletter/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/evento/:id" element={<Planos />} />
          <Route path="/misdatos/:id" element={<Payment />} />
          <Route path="/gateway/:id" element={<Gateway />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </AuxProvider>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
