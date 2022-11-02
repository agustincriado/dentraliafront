import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { Offcanvas, Container, CloseButton } from "react-bootstrap";
import Buscador from "../Buscador.js"
// https://react-bootstrap.github.io/components/offcanvas/
const SideBar = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const [useNav, setNav] = useState('')
    const location = useLocation();

    useEffect(() => setNav(location.pathname), [setNav, location])
    const toggleSideMenu = () => setSideMenu(!sideMenu)
    return (<header>
        <Container>
            <div className="navBar container mobile">
                <div className="social-links-wrap">
                    <Buscador />
                    <ul className="social-links">
                        <li><a href="/"><img src="/images/facebook-logo.png" alt="" /></a></li>
                        <li><a href="/"><img src="/images/twitter-logo.png" alt="" /></a></li>
                        <li><a href="/"><img src="/images/instagram-logo.png" alt="" /></a></li>
                    </ul>
                </div>
                <FaBars onClick={toggleSideMenu} />
                <Offcanvas show={sideMenu} placement="end" onHide={toggleSideMenu}>
                    <Offcanvas.Body>
                        <CloseButton onClick={toggleSideMenu} />
                        <ul className="ul sideBar">
                            <li><Link className={useNav === '/' ? 'active' : ''} to="/">Experiencias</Link></li>
                            <li><Link className={useNav === '/about' ? 'active' : ''} to="/about">Quiénes Somos</Link></li>
                            <li><Link className={useNav === '/events' ? 'active' : ''} to="/events">Crea Tu Evento</Link></li>
                            <li><Link className={useNav === '/faq' ? 'active' : ''} to="/faq">Preguntas Frecuentes</Link></li>
                            <li><Link className={useNav === '/newsletter' ? 'active' : ''} to="/newsletter">Newsletter</Link></li>
                            <li><Link className={useNav === '/contact' ? 'active' : ''} to="/contact">Contacto</Link></li>
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
        </Container>
    </header>
    )
}

export default SideBar