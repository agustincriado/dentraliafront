import { useEffect, useState } from "react"
import Logo from "../Logo"
import { Link, useLocation } from 'react-router-dom'
import Buscador from "../Buscador.js"
const NavBar = () => {
    const [useNav, setNav] = useState('')
    const location = useLocation();
    
    useEffect(() => {
        console.log(location)
        setNav(location.pathname)}, [location,setNav])
    
    return (
            <div className="navBar container">
                <div className="navBar inside">
                    <Logo src='https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' alt="Festentradas" />
                    <Buscador />
                    <nav className="navBar">
                        <ul className="ul navBar">
                            <Link className={useNav === '/' ? 'active' : ''} to="/">EXPERIENCIAS</Link> 
                            <Link className={useNav === '/about' ? 'active' : ''} to="/about">QUIENES SOMOS</Link>
                            <Link className={useNav === '/events' ? 'active' : ''} to="/events">CREA TU EVENTO</Link>
                            <Link className={useNav === '/faq' ? 'active' : ''} to="/faq">PREGUNTAS FRECUENTES</Link>
                            <Link className={useNav === '/newsletter' ? 'active' : ''} to="/newsletter">NEWSLETTER</Link>
                            <Link className={useNav === '/contact' ? 'active' : ''} to="/contact">CONTACTO</Link>
                        </ul>
                    </nav>
                </div>
            </div>
    )
}

export default NavBar