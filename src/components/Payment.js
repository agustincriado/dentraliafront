import React, { useEffect, useState } from "react"
import { useAux } from '../context/auxContext'
import { useNavigate } from "react-router"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { useMediaQuery } from 'react-responsive';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CheckoutFlyer from '../components/CheckoutFlyer';

const Payment = (props) => {
  const {
    useId,
    setId,
    usePayload,
    setPayload,
    useMinutes,
    setMinutes,
    useSeconds,
    setSeconds,
  } = useAux()
  const [usePrecio, setPrecio] = useState('')
  // const [useMinutes, setMinutes] = useState('10')
  // const [useSeconds, setSeconds] = useState('00')
  const [useEvent, setEvent] = useState({ evento: '' })
  const [useNewsletter, setNewsletter] = useState(0)
  const [useGdgList, setGdgList] = useState([0, 0])
  const navigate = useNavigate()

  const PUBLICOS = {
    'ATP': '(Todos los públicos)',
    '+12': '(Mayores de 12 años)',
    '+14': '(Mayores de 14 años)',
    '+16': '(Mayores de 16 años)',
    '+18': '(Mayores de 18 años)',
    '+21': '(Mayores de 21 años)',
    '+25': '(Mayores de 25 años)',
    'MenoresAcomp': '(Menores acompañados)',
    'Otros': '(Otros)',
  }
  const isDesktop = useMediaQuery({
      query: '(min-width: 450px)'
  })
  useEffect(() => {
    if (!useId) navigate('/404')
    console.log(usePayload)
  }, [useId])


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
      console.log("limpiando componente")
      clearInterval(sampleInterval);
    };

  }, [useMinutes, useSeconds]);

  useEffect(() => {
    if (usePayload.length > 0) {
      const gdgList = []
      const arrayNumbers = usePayload.map((ticket) => ticket.price + Number(ticket.zonaGDG))
      const totalPrice = arrayNumbers.reduce((a, b) => a + b)
      usePayload.forEach(ticket => gdgList.push(Number(ticket.zonaGDG)))
      setGdgList(gdgList)
      setPrecio(totalPrice)
    }
  }, [usePrecio])

  useEffect(() => {
    async function retrieveEvent() {
      const event = await getDoc(doc(db, 'Eventos', useId.evento))
      setEvent(event.data())
      setId({
        ...useId,
        imgsrc: event.data().webImage ? event.data().webImage : 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png'
      })
    }
    if (useId.evento !== '' && useEvent.evento === '') retrieveEvent()
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submit!")
    if (e.target['staticEmail'].value !== e.target['confirmEmail'].value) alert("Confirme su email")
    const datosClientes = {
      email: e.target['staticEmail']?.value,
      fullName: e.target['name']?.value + ' ' + e.target['surname']?.value,
      dni: e.target['dni']?.value,
      tel: e.target['tel']?.value,
      zip: e.target['zipCode']?.value,
      datos: e.target['datos[txtadicional]']?.value,
      newsletter: useNewsletter,
    }
    const direccionIP = await getIpDirection()
    const payload = {
      carrito: usePayload,
      cliente: datosClientes,
      eventoId: useId.evento,
      transactionType: 'Web',
      direccionIP: direccionIP,

      quantity: usePayload.length,
      unitPrice: (usePayload.reduce((a, b) => {
        if (b.seguro) {
          return a + b.fullPrice
        } else return a + b.sinSeguro
      }, 0)) / usePayload.length,
      totalPrice: usePayload.reduce((a, b) => {
        if (b.seguro) {
          return a + b.fullPrice
        } else return a + b.sinSeguro
      }, 0),
      info: usePayload.map(obj => obj.seatInfo),
    }

    setPayload(payload)
    navigate('/gateway/' + useId.evento)
  }
  const convertUnix = (unix) => {
    const Days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = new Date(unix * 1000)
    const stringDate = date.toISOString().split('T')[0]
    const arrDate = stringDate.split('-')
    const day = date.getDay()
    return Days[day] + ' ' + arrDate[2] + '/' + arrDate[1] + '/' + arrDate[0]
  }

  const convertedDate = useEvent.evento !== '' ? convertUnix(useEvent.unixDateStart) : ''

  const getIpDirection = async () => {
    let direccion = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=39658c0ff05d41b7bb2e0c79e2fadcd3")
    return direccion.json()
  }

  const toggleNewsletter = () => setNewsletter(!useNewsletter)


  return (<>
    <CheckoutFlyer />
    <div className='contenedorCheckout'>
      <div className="container gridDisplay">
        <section>
          
          <h1 className="eventTittle">
            <strong>{useEvent.name !== '' ? useEvent.name : ''}</strong>
          </h1>
          <section className="dottedSeparator">
          </section>
          <h6 className="checkoutDate d-flex mb-4"><div className="iconClock"><svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.875 20.3125V11.875C22.875 10.8594 22.0156 10 21 10C19.9062 10 19.125 10.8594 19.125 11.875V21.25C19.125 21.875 19.3594 22.4219 19.8281 22.8125L24.8281 26.5625C25.1406 26.7969 25.5312 26.875 25.9219 26.875C26.4688 26.875 27.0156 26.6406 27.4062 26.1719C28.0312 25.3125 27.875 24.1406 27.0156 23.5156L22.875 20.3125ZM20.9219 0C9.82812 0 0.921875 8.98438 0.921875 20C0.921875 31.0938 9.82812 40 20.9219 40C31.9375 40 40.8438 31.0938 40.8438 20C40.8438 8.98438 32.0156 0 20.9219 0ZM21 36.25C12.0156 36.25 4.75 28.9844 4.75 20C4.75 11.0938 12.0156 3.75 21 3.75C29.9062 3.75 37.25 11.0938 37.25 20C37.25 28.9844 29.9062 36.25 21 36.25Z" fill="#FF1E1E"/>
</svg>
</div><span>{convertedDate}</span></h6>
          <h6 className="checkoutLocation d-flex"><div className="iconLocation"><svg width="31" height="41" viewBox="0 0 31 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3315 0.333771C6.97217 0.333771 0.331543 7.05252 0.331543 15.3338C0.331543 21.4275 2.36279 23.1463 13.769 39.5525C14.1597 40.0994 14.7065 40.3338 15.3315 40.3338C15.8784 40.3338 16.4253 40.0994 16.8159 39.5525C28.2222 23.0681 30.3315 21.4275 30.3315 15.3338C30.3315 7.05252 23.6128 0.333771 15.3315 0.333771ZM15.3315 35.1775C13.9253 33.2244 12.6753 31.4275 11.5815 29.9431C4.78467 20.2556 4.08154 19.0056 4.08154 15.3338C4.08154 9.1619 9.08154 4.08377 15.3315 4.08377C21.5034 4.08377 26.5815 9.1619 26.5815 15.3338C26.5815 19.0056 25.8003 20.2556 19.0034 29.9431C17.9097 31.4275 16.6597 33.2244 15.3315 35.1775ZM15.3315 9.08377C11.8159 9.08377 9.08154 11.8181 9.08154 15.3338C9.08154 18.7713 11.8159 21.5838 15.3315 21.5838C18.769 21.5838 21.5815 18.7713 21.5815 15.3338C21.5815 11.8181 18.769 9.08377 15.3315 9.08377ZM15.3315 17.8338C13.9253 17.8338 12.8315 16.74 12.8315 15.3338C12.8315 14.0056 13.9253 12.8338 15.3315 12.8338C16.6597 12.8338 17.8315 14.0056 17.8315 15.3338C17.8315 16.74 16.6597 17.8338 15.3315 17.8338Z" fill="#FF1E1E"/>
</svg></div><span>{useEvent.recintoName + " | " + useEvent.province}</span></h6>
          {/* <h6>{useEvent.name !== '' ? convertedDate + ' en ' + useEvent.recintoName + ' de ' + useEvent.province + ' ' + PUBLICOS[useEvent.publico] : ''}</h6> */}
          {/* <div>
            <ul>
              {usePayload ? usePayload.map((ticket) => {
                return (<li key={ticket.seatInfo}>{ticket.seatInfo}</li>)
              }) : ''}
            </ul>
            { }
          </div> */}
          <div className="ticketInfo">
            {/* <h2>Entrada {usePayload?.map(ticket => ticket.zona)}<strong className="strongPayment">
              {usePrecio
                ? ' ' + Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(usePrecio)
                : ''
              }</strong></h2> */}
            {/* {useEvent.publico === 'ATP' ? <small className="subText info"><FontAwesomeIcon icon={faCircleInfo} /> OBLIGATORIA PARA BEBÉS MAYORES DE 12 MESES </small> : ''} */}
          </div>
          {/* <article className="GDGDeclaration">
            Se a&ntilde;adir&aacute; + {Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(useGdgList.reduce((a, b) => Number(a) + Number(b)))} de gastos de gesti&oacute;n
          </article> */}
          {
            isDesktop ? '' : (
            <div className="mobileImage">
              <div className="">
                <img style={{ width: "358px", borderRadius: "15px", height:"453px" }} src={useEvent.webImage ? useEvent.webImage : 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png'}></img>
              </div>
            </div>
            )
          }
          <div className="timerContainer">
            <span className="timesUp">¡Date Prisa! La Reserva De Tu Pedido Termina En:</span>
            <p className="timerEvent">
              0{Number(useMinutes)}:{Number(useSeconds) < 10 ? `0${Number(useSeconds)}` : Number(useSeconds)}
            </p>
          </div>
          {/* <h6 className="compradorInfo"><strong>COMPRADOR (A DONDE ENVIAREMOS LAS ENTRADAS)</strong></h6> */}
          <form className="formPayment" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label id="staticEmailLabel" htmlFor="staticEmail" className="col-form-label">E-mail</label>
              <input type="email" placeholder="hola@dentralia.com" className="form-control" id="staticEmail" required={true} aria-required="true" />
            </div>
            <div className="form-group">
              <label id="confirmEmailLabel" htmlFor="confirmEmail" className="col-form-label">Confirma tu e-mail</label>
              <input type="email" placeholder="hola@dentralia.com" className="form-control" id="confirmEmail" required={true} aria-required="true" />
            </div>
            <div className="form-group dual">
              <label id="nameLabel" htmlFor="name" className="col-form-label">Nombre</label>
              <input type="text" placeholder="Nombre" className="form-control" id="name" required={true} aria-required="true" />
            </div>
            <div className="form-group dual">
              <label id="surnameLabel" htmlFor="surname" className="col-form-label">Apellidos</label>
              <input type="text" placeholder="Apellido" className="form-control" id="surname" required={true} aria-required="true" />
            </div>
            <div className="form-group">
              <label id="telLabel" htmlFor="tel" className="col-form-label">Telefono</label>
              <input type="tel" placeholder="+34 654 123 987" className="form-control" id="tel" required={true} aria-required="true" />
            </div>
            <div className="form-group dual">
              <label id="dniLabel" htmlFor="dni" className="col-form-label">DNI</label>
              <input type="text" placeholder="00" className="form-control" id="dni" required={true} aria-required="true" />
            </div>
            
            <div className="form-group dual">
              <label id="zipCodeLabel"htmlFor="zipCode" className="col-form-label">C&oacute;digo Postal</label>
              <input type="text" placeholder="00000" className="form-control" id="zipCode" required={true} aria-required="true" />
            </div>
            <div className="form-group">
              <p>
              <input type="checkbox" id="acceptNewsletter" name="acceptNewsletter" onClick={(e) => toggleNewsletter(e)} />
              <label htmlFor="acceptNewsletter" id="newsletterLabel" />Marca esta casilla para autorizarnos a enviarte información de otros eventos que realicemos</p>
              <br />
            </div>
            <button className="btn btnCheckout">Realizar pago</button>
          </form>
        </section>
        {
          isDesktop ? (<section className="desktopImage">
          <div className="">
            <img style={{ width: "572px", borderRadius: "25px", height:"724px" }} src={useEvent.webImage ? useEvent.webImage : 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png'}></img>
          </div>
        </section>) : ''
        }
        
      </div>
    </div>
  </>
  )
}

export default Payment