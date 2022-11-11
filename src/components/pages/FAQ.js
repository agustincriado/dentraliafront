import { useEffect } from 'react';
import { useAux } from '../../context/auxContext';
import Flyer from '../Flyer';

const FAQ = () => {
  const { useId, setId } = useAux();
  useEffect(() => {
    window.scrollTo(0, 0)
    if(!useId) setId('faq')
  }, [useId])
  return (
    <>
      <Flyer />
      <div className='contenedor'>
        <div className="inside">
          <div className="accordion accordion-flush" id="accordionFlushFAQ">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  ¿Cómo me llegan las entradas?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body"><p>Las entradas te las enviamos automáticamente nada más las compras a tu dirección de e-mail. Recibirás un correo electrónico con varios códigos QR. Cada código QR corresponde a una de tus entradas.</p></div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Me he equivocado indicando el e-mail
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body"><p>Si has puesto mal tu dirección de e-mail, y por lo tanto no te llegan las entradas, <a href="/contact">contáctanos.</a> Tienes que indicarnos tu Nombre y apellidos, evento para el compraste las entradas, fecha del evento, cantidad de entradas compradas y el e-mail que indicaste, así como la nueva dirección de correo a la que quieres que te reenviemos las entradas.</p></div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Llevo un rato esperando y no me llegan las entradas
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body"><p>Si estás seguro o segura de que has indicado bien el e-mail y no te llegan las entradas, mira en la carpeta de "Correo no deseado". Quizá estén ahí. Si tampoco las recibes, entonces <a href="/contact">contáctanos.</a></p></div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  No se han podido validar mis entradas
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body"><p>i no han podido validar tus entradas en el evento, escríbenos. Recuerda reenviarnos el correo con tus entradas para que podamos localizarlas e investigar lo ocurrido.</p></div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  Quiero devolver mis entradas o dárselas a otra persona
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body">
                  <p>Dentralia declara expresamente que por política de empresa no se realizarán cambios ni devoluciones una vez finalizado el proceso de compra, con la única excepción de los casos de cancelación del evento.</p>
                  <p>El mal tiempo, la imposibilidad de asistir al Evento o la comisión de un error en el momento de introducir cualquier dato a lo largo del proceso de compra de entradas al Evento no son motivos que permitan su devolución.</p>
                  <p>Te sugerimos revisar toda la información relativa al evento y las condiciones aplicables al mismo antes de confirmar la compra.</p>
                  <p>La normativa aplicable en vigor en materia de consumo y de ordenación del comercio minorista establece que en este tipo de adquisiciones el comprador no podrá ejercitar el derecho de desistimiento, ni el de resolución.</p>
                  <p>En caso de se produzca la cancelación o cualquier tipo de cambio que afecte a uno de los eventos publicados en nuestra web, hará todo posible para nada más recibir la correspondiente autorización del Organizador, proceder a la publicación de dicha información.. No obstante, no se garantiza que seas informado de la cancelación ya que la responsabilidad de la comunicación es del organizador.</p>
                  <p>En el caso de que se decida proceder a la devolución del precio de las entradas que adquiridas , será reembolsado por DENTRALIA en el mismo medio de pago, dentro del plazo de treinta (30) días hábiles desde la fecha de la comunicación pública de la cancelación.</p>
                  <p>En caso de que un evento se postponga o cancele de forma definitiva procederemos a devolver el precio que abonaste por tus entradas.</p>
                  <p>Si finalmente no pudieras asistir en la nueva fecha, tendrás un plazo de quince (15) días hábiles para solicitar la devolución del precio que pagaste por las entradas. En cualquier otro caso podremos confirmar tu reserva para el evento, sin derecho a exigir devolución del precio.</p>
                  <p>El importe de la devolución será por el precio total de la compra descontando los gastos de gestión que se aplican en las compras al tratarse de los costes del servicio por venta comisionada.</p></div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingSix">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  Normativa Covid-19
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushFAQ">
                <div className="accordion-body"><p>Antes de comprar tu entrada y antes de venir a los espectáculos, por favor lee detenidamente las siguientes normas de entrada. La venta de entradas está sujeta a la normativa del Covid-19. Las condiciones pueden variar ya que dependerá de la situación y las recomendaciones sanitarias del momento.</p>
                  <p>Dada la situación excepcional ante la que nos encontramos, en el supuesto de que, llegada o próxima la celebración del evento, la Autoridad competente imponga o acuerde una serie de medidas y limitaciones tales que nos obligue a realizar cambios en las fechas de celebración del evento, o se establezcan nuevas restricciones o ampliaciones de aforo que varíen de las vigentes en el momento de adquisición de la entrada por el consumidor y usuario, Diverfest/Dentralia se reserva el derecho a realizar todas aquellas modificaciones que resulten necesarias para el cumplimiento de la ley, incluyendo a modo enunciativo y no limitativo, el cambio en la fecha del evento, la variación en la asignación del número de asiento o del tipo de entrada adquirida, lo que será comunicado en todo caso al comprador de la misma, el cual dispondrá de un plazo de 14 días desde la recepción de dicha comunicación para reclamar la devolución del importe de su entrada, excluyendo los gastos de gestión, en caso de que exista disconformidad con las nuevas condiciones de venta.</p>
                  <p>Mascarilla: La mascarilla será obligatoria SIEMPRE. Prestando especial atención a la hora de acceder y salir del recinto o moverse dentro del auditorio (para ir al baño o a las barras). Úsala siempre, aunque estés sentado en tu asiento. Quítatela solo para consumir. Es responsabilidad de todos poder seguir disfrutando de los espectáculos en directo.</p>
                  <p>La cantidad de butacas permitidas por proceso de compra es de un mínimo de 2 y un máximo de 4. Si quieres adquirir sólo una butaca individual puedes escribir a hola@festentradas.com. Si lo que quieres es comprar más de 4 puedes hacerlo iniciando un nuevo proceso de compra una vez finalizado este.</p>
                  <p>Datos para la compra: deberás rellenar nombre, apellidos y mail tanto del comprador como de cada uno de los asistentes.</p>
                  <p>Personas con Movilidad Reducida: el tipo de entrada será el mismo.</p>
                  <p>Menores: Todos los asistentes a partir de 1 año de edad deberán ser poseedores de entrada. Política de menores: Menores de entre 2 y 14 años, acompañados de padre/madre/tutor legal y con la autorización firmada. Menores de 14 a 16, acompañados de una persona de 18 años o más y con la autorización firmada. Menores de 16 y 17, únicamente tendrán que enviar la autorización firmada por padre/madre/tutor legal. La autorización firmada por padre/madre/tutor legal tendrá que enviarse vía online hasta 24 horas antes del concierto a hola@festentradas.com.</p>
                  <p>Cierre de accesos: 15 minutos antes del comienzo de cada concierto. Asegúrate de llegar con tiempo.</p>
                  <p>No se puede introducir comida ni bebida dentro del recinto. Solo agua de máximo 330ml sin tapón. El tamaño máximo permitido de las mochilas y bolsos es de 30cm x 25cm. No podrá introducirse, por seguridad, cualquier objeto que sea susceptible de causar daño. No está permitido entrar con animales a excepción de los perros de acompañamiento o perros adiestrados identificados.</p>
                  <p>Si sales del recinto ya no podrás volver a entrar. Una vez dentro del recinto, sigue las indicaciones de nuestro equipo en todo momento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ