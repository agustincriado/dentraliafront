import { useState } from "react"
import Logo from "../Logo"
import { Link } from 'react-router-dom'
import Buscador from "../Buscador.js"
const NavBar = () => {
    const [useNav, setNav] = useState('')

    const changeState = (e) => {
        setNav(e.target.pathname)
    }
    return (
            <div className="navBar container">
                <div className="navBar inside">
                    <Logo src='https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' alt="Festentradas" />
                    <Buscador />
                    <nav className="navBar">
                        <ul className="ul navBar">
                            <Link onClick={changeState} className={useNav === '/' ? 'active' : ''} to="/">EXPERIENCIAS</Link> 
                            <Link onClick={changeState} className={useNav === '/about' ? 'active' : ''} to="/about">QUIENES SOMOS</Link>
                            <Link onClick={changeState} className={useNav === '/events' ? 'active' : ''} to="/events">CREA TU EVENTO</Link>
                            <Link onClick={changeState} className={useNav === '/faq' ? 'active' : ''} to="/faq">PREGUNTAS FRECUENTES</Link>
                            <Link onClick={changeState} className={useNav === '/newsletter' ? 'active' : ''} to="/newsletter">NEWSLETTER</Link>
                            <Link onClick={changeState} className={useNav === '/contact' ? 'active' : ''} to="/contact">CONTACTO</Link>
                        </ul>
                    </nav>
                </div>
            </div>
    )
}

export default NavBar