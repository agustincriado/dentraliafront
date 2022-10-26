import { Container, Col, Row, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="mainFooter-wrap">
                <Container>
                    <div className="mainFooter-content">
                        <Row>
                            <Col sm={12}>
                                <div className="footer-logo">
                                    <Link to=""><Image src="/images/festentradas-logo.png" /></Link>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <h6>Quiénes Somos</h6>
                                    <p>Confía en Dentralia la organización y/o venta de tickets de tus eventos. Contamos con años de experiencia en el sector, y un gran know-how. Centraliza la venta de tus entradas, y controla en completo tiempo real todo tipo de estadísticas. <Link to="">Para más info.</Link></p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <h6>Experiencias</h6>
                                    <ul className="footer-links">
                                        <li>
                                            <Link to="">Crea Tu Evento</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="footer-content">
                                    <h6>Preguntas Frecuentes</h6>
                                    <ul className="footer-links">
                                        <li>
                                            <Link to="">Contacto</Link>
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
                        <p>&copy; 2022 Festentradas</p>
                        <div className="privacyPolitic">
                            <a href=".">Aviso Legal</a>
                            <a href=".">Politica de privacidad</a>
                        </div>
                    </div>
                </Container>
            </div>
        </footer >
    )
}

export default Footer