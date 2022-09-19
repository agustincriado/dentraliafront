import React, { useEffect, useState } from "react"
import { useAux } from '../context/auxContext'
import { useNavigate } from "react-router"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    const [useEvent, setEvent] = useState({evento: ''})
    const [useNewsletter, setNewsletter] = useState(0)
    const [useGdgList, setGdgList] = useState([0,0])
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
    useEffect(() => {
        if(!useId) navigate('/404')
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
      
      }, [useMinutes,useSeconds]);
    
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
      if(useId.evento !== '' && useEvent.evento === '' ) retrieveEvent()
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
        unitPrice: (usePayload.reduce((a,b) => {
          if(b.seguro) {
             return a+b.fullPrice
          } else return a+b.sinSeguro
        }, 0))/usePayload.length,
        totalPrice: usePayload.reduce((a,b) => {
          if(b.seguro) {
             return a+b.fullPrice
          } else return a+b.sinSeguro
        }, 0),
        info: usePayload.map(obj => obj.seatInfo),
      }

      setPayload(payload)
      navigate('/gateway/'+useId.evento)
    }
    const convertUnix = (unix) => {
      const Days = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      const date = new Date(unix*1000)
      const stringDate = date.toISOString().split('T')[0]
      const arrDate = stringDate.split('-')
      const day = date.getDay()
      return Days[day]+' '+arrDate[2]+'/'+arrDate[1]+'/'+arrDate[0]
    }

    const convertedDate = useEvent.evento !== '' ? convertUnix(useEvent.unixDateStart) : ''
    
    const getIpDirection = async () => {
      let direccion = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=39658c0ff05d41b7bb2e0c79e2fadcd3")
      return direccion.json()
    }
    
    const toggleNewsletter = () => setNewsletter(!useNewsletter)
    

    return (
        <div className="container gridDisplay">
          <section>
        <div>
        <p className="timerEvent">
          0{Number(useMinutes)}:{Number(useSeconds) < 10 ? `0${Number(useSeconds)}` : Number(useSeconds)}
        </p>
    </div>
    <h1 className="eventTittle">
      <strong>{useEvent.name !== '' ? useEvent.name : ''}</strong>
    </h1>
    <h6>{useEvent.name !== '' ? convertedDate+ ' en '+ useEvent.recintoName + ' de ' + useEvent.province + ' ' + PUBLICOS[useEvent.publico] : ''}</h6>
        <div>
            <ul>
            {usePayload ? usePayload.map((ticket) => {
                return (<li key={ticket.seatInfo}>{ticket.seatInfo}</li>)
            }) : ''}
            </ul>
            {  }
        </div>
          <div className="ticketInfo">
              <h2>Entrada {usePayload?.map(ticket => ticket.zona)}<strong className="strongPayment">
              {usePrecio 
                ? ' ' + Intl.NumberFormat('es-ES',{ style: 'currency', currency: 'EUR'}).format(usePrecio) 
                : ''
              }</strong></h2>
              <hr />
              {useEvent.publico === 'ATP' ? <small class="subText info"><FontAwesomeIcon icon={faCircleInfo} /> OBLIGATORIA PARA BEBÉS MAYORES DE 12 MESES </small> : ''}
          </div>
          <article className="GDGDeclaration">
              Se a&ntilde;adir&aacute; + {Intl.NumberFormat('es-ES',{ style: 'currency', currency: 'EUR'}).format(useGdgList.reduce((a, b) => Number(a) + Number(b)))} de gastos de gesti&oacute;n
          </article>
              <h6 className="compradorInfo"><strong>COMPRADOR (A DONDE ENVIAREMOS LAS ENTRADAS)</strong></h6>
            <form className="formPayment" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group dual">
                <label htmlFor="staticEmail" className="col-form-label">E-mail</label>
                <input type="email" className="form-control" id="staticEmail" required={true} aria-required="true" />
              </div>
              <div className="form-group dual">
                <label htmlFor="staticEmail" className="col-form-label">Confirma tu e-mail</label>
                <input type="email" className="form-control" id="confirmEmail" required={true} aria-required="true"/>
              </div>
              <div className="form-group dual">
                <label htmlFor="staticEmail" className="col-form-label">Nombre</label>
                <input type="text" className="form-control" id="name" required={true} aria-required="true"/>
              </div>
              <div className="form-group dual">
                <label htmlFor="staticEmail"className="col-form-label">Apellidos</label>
                <input type="text" className="form-control" id="surname" required={true} aria-required="true"/>
              </div>
              <div className="form-group dual">
                <label htmlFor="staticEmail" className="col-form-label">DNI</label>
                <input type="text" className="form-control" id="dni" required={true} aria-required="true"/>
              </div>
              <div className="form-group dual">
                <label htmlFor="staticEmail" className="col-form-label">Telefono</label>
                <input type="tel" className="form-control" id="tel" required={true} aria-required="true"/>
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">C&oacute;digo Postal</label>
                <input type="text" className="form-control" id="zipCode" required={true} aria-required="true"/>
              </div>
              <div className="form-group">
                      <div className="col-md-12">
                          <br />
                          <h5>
                            <strong className="compradorInfo">
                              Debido a la situación expecional del Covid-19 indica los nombres, apellidos y teléfonos de las personas que irán contigo al evento
                            </strong>
                          </h5>
                          <small>
                          (Ejemplo: Pepe Pérez, 612123123 - María López, 612123123)
                          </small>
                      </div>
              </div>
              <div className="form-group">
                      <div className="col-md-12">
                          <textarea className="form-control" required="" name="datos[txtadicional]" style={{height: '200px'}}></textarea>
                      </div>
                  </div>
              <div className="form-group">
              <p><input type="checkbox" name="acceptNewsletter" onClick={(e) => toggleNewsletter(e)} /> Marca esta casilla para autorizarnos a enviarte información de otros eventos que realicemos</p>
                          <p>Realizando la compra aceptas la <a href="/normativa-covid">normativa referente al Covid-19</a></p>
                          <br/>
              </div>
              {/* <div className="row">
                  <div className="form-group">
                      <div className="col-md-6">
                          <label htmlFor="staticEmail" className="col-form-label">E-mail</label>
                          <input type="email" className="form-control" id="staticEmail" required={true} aria-required="true" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="staticEmail" className="col-form-label">Confirma tu e-mail</label>
                        <input type="email" className="form-control" id="confirmEmail" required={true} aria-required="true"/>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="form-group">
                      <div className="col-md-6">
                          <label htmlFor="staticEmail" className="col-form-label">Nombre</label>
                          <input type="text" className="form-control" id="name" required={true} aria-required="true"/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="staticEmail"className="col-form-label">Apellidos</label>
                        <input type="text" className="form-control" id="surname" required={true} aria-required="true"/>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="form-group">
                      <div className="col-md-6">
                          <label htmlFor="staticEmail" className="col-form-label">DNI</label>
                          <input type="text" className="form-control" id="dni" required={true} aria-required="true"/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="staticEmail" className="col-form-label">Telefono</label>
                        <input type="tel" className="form-control" id="tel" required={true} aria-required="true"/>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="form-group">
                      <div className="col-md-12">
                          <label htmlFor="staticEmail" className="col-form-label">C&oacute;digo Postal</label>
                          <input type="text" className="form-control" id="zipCode" required={true} aria-required="true"/>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="form-group">
                      <div className="col-md-12">
                          <br />
                          <h5>
                            <strong className="compradorInfo">
                              Debido a la situación expecional del Covid-19 indica los nombres, apellidos y teléfonos de las personas que irán contigo al evento
                            </strong>
                          </h5>
                          <small>
                          (Ejemplo: Pepe Pérez, 612123123 - María López, 612123123)
                          </small>
                      </div>
                  </div>
              </div>
              <br/>
              <div className="row">
                  <div className="form-group">
                      <div className="col-md-12">
                          <textarea className="form-control" required="" name="datos[txtadicional]" style={{height: '200px'}}></textarea>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                          <p><input type="checkbox" name="acceptNewsletter" onClick={(e) => toggleNewsletter(e)} /> Marca esta casilla para autorizarnos a enviarte información de otros eventos que realicemos</p>
                          <p>Realizando la compra aceptas la <a href="/normativa-covid">normativa referente al Covid-19</a></p>
                          <br/>
                      </div>
              </div> */}
              <button className="btn btn-primary">Realizar pago</button>
            </form>
        </section>
        <section>
            <div className="">
                <img style={{width: "100%"}} src={useEvent.webImage ? useEvent.webImage : 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png'}></img>
            </div>
          </section>
        </div>
    )
}

export default Payment