import { db } from "../firebase"
import { useAux } from "../context/auxContext"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCreditCard } from "@fortawesome/free-regular-svg-icons"
import Flyer from '../components/Flyer';
import CheckoutFlyer from "./CheckoutFlyer"
const Gateway = () => {
  const initialValues = {
    webImage: '',
  }

  const navigate = useNavigate()
  const {
    useId,
    usePayload,
    useMinutes,
    setMinutes,
    useSeconds,
    setSeconds, } = useAux()
  const [useEvent, setEvent] = useState(initialValues)

  useEffect(() => {
    if (useId === '') navigate('/404')
    const fullEvent = async () => {
      console.log(useId, usePayload, 'a')
      const task = await getDoc(doc(db, 'Eventos', useId))
      console.log(task.data())
      setEvent(task.data())
    }
    if (useId) fullEvent()

    console.log(usePayload)
  }, [usePayload])

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (Number(useSeconds) > 0) {
        console.log("number")
        const newNumber = Number(useSeconds) - 1
        console.log(newNumber, "newSecond")
        setSeconds(newNumber);
      }
      if (Number(useSeconds) === 0) {
        if (useMinutes === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(useMinutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    if (!useMinutes && !useSeconds) {
      navigate('/')
    }
    return () => {
      clearInterval(sampleInterval);
    };

  }, [useMinutes, useSeconds]);

  const PUBLICO = {
    '+12': 'Mayores de 12 años',
    '+14': 'Mayores de 14 años',
    '+16': 'Mayores de 16 años',
    '+18': 'Mayores de 18 años',
    '+21': 'Mayores de 21 años',
    '+25': 'Mayores de 25 años',
    'MenoresAcomp': 'Menores Acompañados',
    'Otros': 'Otros',
    'ATP': 'Todos los públicos'
  }

  const convertUnix = (unix) => {
    const Days = ['Doming', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = unix ? new Date(unix * 1000) : new Date()
    const stringDate = date.toISOString().split('T')[0]
    const arrDate = stringDate.split('-')
    const day = date.getDay()
    return {
      day: Days[day],
      date: arrDate[2] + '/' + arrDate[1] + '/' + arrDate[0]
    }
  }

  const convertedDate = useEvent.unixDateStart !== '' ? convertUnix(useEvent.unixDateStart) : ''
  const uriRedsys = 'https://dentraliaserver.herokuapp.com/api/v1'//'https://sis-t.redsys.es:25443/sis/realizarPago'

  // console.log(evento)
  return (
    <>
      <CheckoutFlyer />
      <div className='contenedor'>
        <p className="timerEvent">
          0{Number(useMinutes)}:{Number(useSeconds) < 10 ? `0${Number(useSeconds)}` : Number(useSeconds)}
        </p>
        <div className="container gridDisplay">
          <section className="ticketResume">
            <h1 className="eventTittle">
              <strong>
                {useEvent.name !== '' ? useEvent.name : ''}
              </strong>
            </h1>
            <h6 className="eventSubtittle">{useEvent.name !== '' ? convertedDate.day + ' ' + convertedDate.date + ' @ ' + useEvent.recintoName + ' en ' + useEvent.province + ' (' + PUBLICO[useEvent.publico] + ')' : ''}</h6>
            <h6 className="eventDetailed"><b>VAS A REALIZAR UN PAGO POR IMPORTE DE <strong className="ticketData">"{Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(usePayload.totalPrice)}"</strong> CORRESPONDIENTE AL EVENTO DEL DÍA <strong className="ticketData">"{convertedDate.date}"</strong> EN <strong className="ticketData">{useEvent.recintoName}</strong>. PARA TU(S) <strong className="ticketData">"{usePayload.quantity}"</strong> ENTRADA(S) <strong className="ticketData">"
              {
                usePayload ? usePayload.carrito.map(ticket => ticket.zona) : ''
              }"</strong></b></h6>
            <span className="ticketTittle">LOS DATOS ASOCIADOS A LA(S) ENTRADA(S) SON:</span>
            <ul className="ticketData">
              <li>Nombre y apellidos: {usePayload?.cliente?.fullName}</li>
              <li>DNI: {usePayload?.cliente?.dni}</li>
              <li>Tel&eacute;fono: {usePayload?.cliente?.tel}</li>
              <li>Cantidad: {usePayload?.quantity}</li>
              <li>Precio unitario: {Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(usePayload?.unitPrice)}</li>
              <li>Precio total: {Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(usePayload?.totalPrice)}</li>
            </ul>

            <b>TU(S) ASIENTO(S) SELECCIONADO(S) SON:</b>
            <ul className="ticketsList">
              {usePayload ? usePayload?.carrito.map((ticket) => {
                return (<li key={ticket.dbstring}>{ticket.seatInfo}</li>)
              }) : ''}
            </ul>

            <article className="GDGDeclaration">
              En el importe a pagar se incluyen los gastos de gesti&oacute;n
            </article>

            <div className="normativaAnchor">
              Realizando la compra aceptas la <a href="/">normativa referente al Covid-19</a>
            </div>
            <form action={uriRedsys} method="POST">
              <input type="hidden" name="payload" value={JSON.stringify(usePayload)}></input>
              {/* <input type="hidden" name="Carrito" value={JSON.stringify(usePayload.carrito)}></input>
              <input type="hidden" name="ClientData" value={JSON.stringify(usePayload.cliente)}></input>
              <input type="hidden" name="data" value={JSON.stringify(usePayload.direccionIP)}></input>
              <input type="hidden" name="eventoID" value={JSON.stringify(usePayload.eventoId)}></input>
              <input type="hidden" name="info" value={JSON.stringify(usePayload.info)}></input>
              <input type="hidden" name="quantity" value={JSON.stringify(usePayload.quantity)}></input>
              <input type="hidden" name="seguro" value={JSON.stringify(usePayload.seguro)}></input>
              <input type="hidden" name="seguroPrice" value={JSON.stringify(usePayload.seguroPrice)}></input>
              <input type="hidden" name="TotalPrice" value={JSON.stringify(usePayload.totalPrice)}></input>
              <input type="hidden" name="UnitPrice" value={JSON.stringify(usePayload.unitPrice)}></input> */}
              <button className="btn btn-primary btn-lg mb-xlg"><FontAwesomeIcon icon={faCreditCard} className="faCreditCard" />Pagar con tarjeta ({Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(usePayload?.totalPrice)})</button>
            </form>
          </section>
          <section>
            <div className="col-md-5">
              <img style={{ width: "100%" }} src={useEvent.webImage ? useEvent.webImage : 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png'}></img>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Gateway