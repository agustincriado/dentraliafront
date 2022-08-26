import React, { useState } from "react";
import Logo from "../Logo"
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa";

const SideBar = () => {
    const [sideMenu, setSideMenu ] = useState(false)
    
    const toggleSideMenu = () => setSideMenu(!sideMenu)
return (
    <div className="navBar container mobile">
        <Logo src='https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' alt="Festentradas" />
        <FaBars onClick={toggleSideMenu} />
                <nav className={sideMenu ? 'nav-menu active' : 'nav-menu' }>
                    <ul className="ul sideBar">
                        <Link to="/">EXPERIENCIAS</Link> 
                        <Link to="/about">QUIENES SOMOS</Link>
                        <Link to="/events">CREA TU EVENTO</Link>
                        <Link to="/faq">PREGUNTAS FRECUENTES</Link>
                        <Link to="/newsletter">NEWSLETTER</Link>
                        <Link to="/contact">CONTACTO</Link>
                    </ul>
                </nav>
        </div>
)
}

export default SideBar