import * as Bs from 'react-icons/bs'
import * as Ai from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Flyer from '../Flyer';
import { useEffect } from 'react';
import { useAux } from '../../context/auxContext';

const About = () => {
    const { useId, setId } = useAux();
    useEffect(() => {
        if(!useId) setId('about')
    }, [useId])
    return (
        <>
            <Flyer />
            <div className='contenedor'>
                <div className='inside'>
                    <div className='aboutSection'>
                        <div>
                            <h4 className='bold'>{<Ai.AiOutlineLike />}Dentralia, tu plataforma de ticketing</h4>
                            <p>Confía en Dentralia la organización y/o venta de tickets de tus eventos. Contamos con años de experiencia en el sector, y un gran know-how. Centraliza la venta de tus entradas, y controla en completo tiempo real todo tipo de estadísticas. Toma decisiones al momento, y aumenta la tasa de conversión de las personas que visitan nuestro portal.</p>
                        </div>
                        <div>
                            <h4>{<Ai.AiOutlineTablet />}Control de accesos</h4>
                            <p>Gracias a nuestra tecnología convierte cualquier teléfono, bien sea Android o iOS en una potente herramienta para validar entradas. Controla el posible fraude y recibe alertas instantáneas ante entradas falsificadas.</p>
                        </div>
                        <div>
                            <h4>{<Ai.AiOutlineCreditCard />}Integracion con pasarelas bancarias</h4>
                            <p>Disponemos de una completa integración con los grandes procesadores de pagos: Stripe, Redsys, 4B, PayPal... No importa con la entidad con la que trabajes, nos adaptamos a cualquier pasarela bancaria.</p>
                        </div>
                        <div>
                            <h4>{<Ai.AiOutlineHeart />}Simplificamos la toma de decisiones</h4>
                            <p>Gracias a los completos informes que obtendrás con nuestra herramienta, toma decisiones acertadas en cuestión de segundos. Nunca fue tan fácil predecir la venta, y ajustar los precios en función del nivel de aceptación de tus clientes.</p>
                        </div>
                        <div>
                            <h4>{<Bs.BsShieldX />}Cashless y pago seguro</h4>
                            <p>Con nuestra herramienta de cashless centraliza el efectivo de tu evento en un punto seguro. Haz que tus clientes acudan ahí a recargar sus pulseras, y cóbrales en las barras mediante sus pulseras RFID. Obtén estadísticas en tiempo real, y envía promociones personalizadas.</p>
                        </div>
                        <div>
                            <h4>{<Ai.AiOutlineWifi />}Integración con sistemas de terceros</h4>
                            <p>Si lo puedes imaginar, lo podemos hacer. Integra todo el proceso de venta de entradas en tu propio sitio web, recibe reportes en tiempo real, o cualquier otro tipo de integración que necesites.
                            </p>
                        </div>
                        <div>
                            <h4>{<Ai.AiOutlineQuestionCircle />}¿Necesitas algo en especial? ¡Cuéntanos!</h4>
                            <p>Estamos abiertos a mejorar y seguir creciendo. Si crees que podemos ayudarte cuéntanos que es lo que necesitas. Escucharemos tu necesidad con atención y pondremos todas las herramientas y ganas para conseguirlo.
                            </p>
                        </div>
                    </div>
                    <div className='contactUs'>
                        <div className='form-control'>
                            <h2>Escríbenos y cuéntanos tu evento</h2>
                            <Link to='/contact' className='anchor'>hola@festentradas.com</Link>
                            <Link to='/contact' className='buttonAnchor'><button className='btn btn-primary'>Contáctanos</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About