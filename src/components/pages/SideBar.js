import React, { useState, useEffect } from "react";
import Logo from "../Logo"
import { Link, useLocation } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { Offcanvas } from "react-bootstrap"; // https://react-bootstrap.github.io/components/offcanvas/
const SideBar = () => {
    const [sideMenu, setSideMenu ] = useState(false)
    const [useNav, setNav] = useState('')
    const location = useLocation();
    
    useEffect(() => setNav(location.pathname), [setNav, location])
    const toggleSideMenu = () => setSideMenu(!sideMenu)
return (
    <div className="navBar container mobile">
        <Logo src='https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' alt="Festentradas" />
        <FaBars onClick={toggleSideMenu} />
        <Offcanvas show={sideMenu} placement="end" onHide={toggleSideMenu}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul className="ul sideBar">
                <Link className={useNav === '/' ? 'active': ''} to="/">EXPERIENCIAS</Link> 
                <Link className={useNav === '/about' ? 'active': ''} to="/about">QUIENES SOMOS</Link>
                <Link className={useNav === '/events' ? 'active': ''} to="/events">CREA TU EVENTO</Link>
                <Link className={useNav === '/faq' ? 'active': ''} to="/faq">PREGUNTAS FRECUENTES</Link>
                <Link className={useNav === '/newsletter' ? 'active': ''} to="/newsletter">NEWSLETTER</Link>
                <Link className={useNav === '/contact' ? 'active': ''} to="/contact">CONTACTO</Link>
            </ul>
        </Offcanvas.Body>
      </Offcanvas>
        
                {/* <nav className={sideMenu ? 'nav-menu active' : 'nav-menu offcanvas offcanvas-start' } tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <ul className="ul sideBar">
                    <button className="btn-close" onClick={toggleSideMenu}></button>
                        <Link className={useNav === '/' ? 'active': ''} to="/">EXPERIENCIAS</Link> 
                        <Link className={useNav === '/about' ? 'active': ''} to="/about">QUIENES SOMOS</Link>
                        <Link className={useNav === '/events' ? 'active': ''} to="/events">CREA TU EVENTO</Link>
                        <Link className={useNav === '/faq' ? 'active': ''} to="/faq">PREGUNTAS FRECUENTES</Link>
                        <Link className={useNav === '/newsletter' ? 'active': ''} to="/newsletter">NEWSLETTER</Link>
                        <Link className={useNav === '/contact' ? 'active': ''} to="/contact">CONTACTO</Link>
                    </ul>
                </nav> */}
        </div>
)
}

export default SideBar