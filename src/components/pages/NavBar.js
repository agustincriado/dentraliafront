import { useEffect, useState } from "react"
import Logo from "../Logo"
import { Image } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom'
import Buscador from "../Buscador.js"
const NavBar = () => {
    const [useNav, setNav] = useState('')
    const location = useLocation();

    useEffect(() => {
        console.log(location)
        setNav(location.pathname)
    }, [location, setNav])

    return (
        <header>
            <div className="main-nav">
                <div className="container">
                    <div className="navBar inside">
                        <Logo src='/images/festentradas-logo.png' alt="Festentradas" />
                        <Buscador />
                        <ul className="social-links">
                            <li><Link to="/"><Image src="/images/facebook-logo.png" /></Link></li>
                            <li><Link to="/"><Image src="/images/twitter-logo.png" /></Link></li>
                            <li><Link to="/"><Image src="/images/instagram-logo.png" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <nav className=" navbar-link">
                <div className="container">
                    <ul>
                        <Link className={useNav === '/' ? 'active' : ''} to="/">Experiencias</Link>
                        <Link className={useNav === '/about' ? 'active' : ''} to="/about">Quiénes Somos</Link>
                        <Link className={useNav === '/events' ? 'active' : ''} to="/events">Crea Tu Evento</Link>
                        <Link className={useNav === '/faq' ? 'active' : ''} to="/faq">Preguntas Frecuentes</Link>
                        <Link className={useNav === '/newsletter' ? 'active' : ''} to="/newsletter">Newsletter</Link>
                        <Link className={useNav === '/contact' ? 'active' : ''} to="/contact">Contacto</Link>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar