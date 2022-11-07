import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Offcanvas, Container, CloseButton } from "react-bootstrap"; // https://react-bootstrap.github.io/components/offcanvas/
import Buscador from "../Buscador.js"
import { useAux } from "../../context/auxContext.js";
const SideBar = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const [useNav, setNav] = useState('')
    const location = useLocation();
    const { setId } = useAux();
    useEffect(() => setNav(location.pathname), [setNav, location])

    const toggleSideMenu = () => setSideMenu(!sideMenu)

    const handleClick = (param) => {
        toggleSideMenu()
        setId(param);
    }
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
                            <li><Link onClick={() => handleClick("")} className={useNav === '/' ? 'active' : ''} to="/">Experiencias</Link></li>
                            <li><Link onClick={() => handleClick("about")} className={useNav === '/quienes-somos' ? 'active' : ''} to="/quienes-somos">Quiénes Somos</Link></li>
                            <li><Link onClick={() => handleClick("events")} className={useNav === '/crea-tu-evento' ? 'active' : ''} to="/crea-tu-evento">Crea Tu Evento</Link></li>
                            <li><Link onClick={() => handleClick("faq")} className={useNav === '/faq' ? 'active' : ''} to="/faq">Preguntas Frecuentes</Link></li>
                            <li><Link onClick={() => handleClick("newsletter")} className={useNav === '/newsletter' ? 'active' : ''} to="/newsletter">Newsletter</Link></li>
                            <li><Link onClick={() => handleClick("contact")} className={useNav === '/contacto' ? 'active' : ''} to="/contacto">Contacto</Link></li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </Container>
    </header>
    )
}

export default SideBar