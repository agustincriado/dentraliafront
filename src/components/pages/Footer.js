import { Container, Col, Row, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useAux } from "../../context/auxContext"

const Footer = () => {
    const { setId } = useAux();

    const handleClick = (param) => setId(param)
    return (
        <footer>
            <div className="mainFooter-wrap">
                <Container>
                    <div className="mainFooter-content">
                        <Row>
                            <Col sm={12}>
                                <div className="footer-logo">
                                    <Link onClick={() => handleClick('')} to="/"><Image src="/images/dentralia-logo.png" /></Link>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <h6>Quiénes Somos</h6>
                                    <p>Confía en Dentralia la organización y/o venta de tickets de tus eventos. Contamos con años de experiencia en el sector, y un gran know-how. Centraliza la venta de tus entradas, y controla en completo tiempo real todo tipo de estadísticas. <Link onClick={() => handleClick('')} to="/quienes-somos">Para más info.</Link></p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <ul className="footer-links">
                                        <li>
                                            <Link onClick={() => handleClick('')} to="/">Experiencias</Link>
                                        </li>
                                    </ul>
                                    <ul className="footer-links">
                                        <li>
                                            <Link onClick={() => handleClick('events')} to="/crea-tu-evento">Crea Tu Evento</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <ul className="footer-links">
                                        <li>
                                            <Link onClick={() => handleClick('faq')} to="/faq">Preguntas Frecuentes</Link>
                                        </li>
                                    </ul>
                                    <ul className="footer-links">
                                        <li>
                                            <Link onClick={() => handleClick('contact')} to="/contacto">Contacto</Link>
                                        </li>
                                    </ul>
                                    <ul className="footer-social-links">
                                        <li>
                                            <Link to=""><Image src="/images/facebook-logo.png" /></Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <Image src="/images/twitter-logo.png" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                                <Image src="/images/instagram-logo.png" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
            <div className="copyright-wrap">
                <Container>
                    <div className="copyright-content">
                        <p>&copy; 2022 Dentralia</p>
                        <div className="privacyPolitic">
                            <a href="/aviso-legal">Aviso Legal</a>
                            <a href="/politica-de-privacidad">Politica de privacidad</a>
                        </div>
                    </div>
                </Container>
            </div>
        </footer >
    )
}

export default Footer