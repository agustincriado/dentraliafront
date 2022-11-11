import { db } from '../../firebase'
import { doc, getDoc, onSnapshot, collection, updateDoc, setDoc, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAux } from '../../context/auxContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import PianoFlyer from '../PianoFlyer';

const Planos = () => {
  const initialValues = {
    zonas: ''
  }
  const isDesktop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const navigate = useNavigate()
  const { useId, setId, setPayload } = useAux()
  const [usePlano, setPlano] = useState(initialValues)
  const [useTicket, setTicket] = useState('')
  const [useCarrito, setCarrito] = useState([])
  const [isLoaded, setLoaded] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [activeBtn, setActiveBtn] = useState(true)
  const [cartErr, setCartErr] = useState([])
  const [useOpacity, setOpacity] = useState(0)
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
    async function CheckData() {
    if (useId === '') {
      console.log("Path", location.pathname)
      const getArr = location.pathname.split('/')
      const idOBJ = {[getArr[1]]: getArr[2]}
      if (idOBJ.evento){
        const Days = ['DOM', 'LUN', 'MART', 'MIER', 'JUE', 'VIE', 'SAB']
    const Months = ['', 'ENE', 'FEB', 'MAR', 'ABR', 'JUN', 'JUL', 'AGO', 'SEPT', 'OCT', 'NOV', 'DIC']
        const getEventData = await getDoc(doc(db, "Eventos", idOBJ.evento))
        const eventInfo = getEventData.data();
        const dateObject = new Date(eventInfo.unixDateStart * 1000)
        const eventDay = dateObject.getDay()
        const eventMonth = dateObject.getMonth()
        // const eventDate = dateObject.getDate()
        setId({
          evento: idOBJ.evento,
          plano: eventInfo.planoZonas,
          eventName: eventInfo.name,
          eventDate: Days[eventDay] + "., " + Months[eventMonth] + "., " + eventInfo.hourStart,
          eventLocation: eventInfo.recintoName
      })
      }
      return
    }
  }
  CheckData()
  }, [isLoaded, useId])
  useEffect(() => {
    const addToCart = (e) => {
      if (e.target.classList.contains('selected')) {
        console.log('removing')
        e.target.classList.remove('selected')
        const newArr = useCarrito.filter((obj) => obj.seatInfo !== e.target.dataset.bsContent)
        setCarrito(newArr)
        // toast('Se ha quitado del carrito', { 
        //   type: 'success',
        //   autoClose: 2000,
        // })
      } else if (!e.target.classList.contains('selected')) {
        if (useCarrito.length < 10) {
          console.log('adding')
          console.log(useCarrito.length)
          e.target.classList.add('selected')
          const getGDG = usePlano.zonas.filter(function (obj) {
            if (obj.name === e.target.dataset.zonaname) return obj
          })

          setCarrito((prevCarrito) => [
            ...prevCarrito,
            {
              row: e.target.dataset.rowId,
              col: e.target.dataset.colId,
              seatInfo: e.target.dataset.bsContent,
              tipo: e.target.dataset.tipo,
              zonaName: getGDG[0].name,
              zonaPrice: getGDG[0].price,
              dbid: e.target.dataset.dbid,
              dbstring: e.target.dataset.dbstring,
              zonaGDG: getGDG[0].gdg,
              seguroPrice: getGDG[0].seguroPrice,
              sinSeguro: Number(getGDG[0].price) + Number(getGDG[0].gdg),
              fullPrice: Number(getGDG[0].price) + Number(getGDG[0].gdg) + Number(getGDG[0].seguroPrice),
            },
          ])
          // toast('Se ha añadido al carrito', { 
          //   type: 'success',
          //   autoClose: 2000,
          // })
        } else {
          console.log("")
          // toast('Se ha alcanzado el limite de transaccion', {
          //   type: 'error',
          //   autoClose: 2000,
          // })
        }
      }
    }

    document.querySelectorAll('span[data-bs-content]').forEach((span) => {
      span.addEventListener('click', addToCart)
    })

    return function cleanupListener() {
      document.querySelectorAll('span[data-bs-content]').forEach((span) => {
        span.removeEventListener('click', addToCart)
      })
    }
  }, [usePlano, useCarrito])
  useEffect(() => {
    if (useTicket !== '') {
      const newArr = useCarrito.filter((value) => {
        if (value.dbstring === useTicket.dbstring) {
          return null
        } else return value
      })
      setCarrito(newArr)
      setTicket('')
    }
    console.log(useCarrito)
  }, [useCarrito, useTicket])

  useEffect(() => {
    async function retrievePlano() {
      console.log("calling retrieve plano")
      const planoQuery = await getDoc(doc(db, 'Eventos', useId.evento, 'PlanoZonas', useId.plano))
      const planoRetrieved = planoQuery.data()
      setPlano(planoRetrieved)
      const queryEntradas = collection(db, 'Eventos', useId.evento, 'Entradas')
      let entradasArr = []
      onSnapshot(queryEntradas, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const task = doc.data()
          task.id = doc.id
          entradasArr.push(task)
        })
        entradasArr.forEach((entrada) => {
          const butaca = document.querySelector(`[data-bs-content="${entrada.seatInfo}"]`)
          butaca.dataset.dbid = entrada.id
          butaca.dataset.dbstring = entrada.uuid
          butaca.dataset.estado = entrada.estado
        })
      })
      setLoaded(1)
    }

    if (useId && usePlano.zonas === '') retrievePlano()

    const setHalfPlano = () => {
      const VIEWPORTS = {
        420: 2.2,
        720: 1.9,
        1366: 0.5,
        1200: 0.2
      }
      const ViewportWidth = (value) => {
        if (720 <= value && value <= 1366) {
          return 0.5
        } else if (value <= 720 && value >= 480) {
          return 1.9
        } else if (value < 480) {
          return 1.85
        } else return 0.2
      }
      const canvas = document.getElementById('canvasHolder')
      // console.log("Actual Vierport Width", ViewportWidth(window.innerWidth))
      canvas.scrollLeft = (canvas.offsetWidth * ViewportWidth(window.innerWidth))
      // dibujarGrid(20, 20, 1, '#ececec')
    }
    setHalfPlano()

  }, [useId])

  const handleSendPay = async () => {
    if (!useCarrito.length) {
      return 
    }
    const getResponse = await fetch('https://dentraliaserver.herokuapp.com/api/v1/ticketAvailable', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({useCarrito: useCarrito, useId: useId})
    })
    const responseJSON = await getResponse.json()
    if (!responseJSON.ticketStatus) {
      const newCarrito = useCarrito.filter(obj => !responseJSON.ticketsAvailable.some(f => f.seatInfo === obj.seatInfo))
      const notAvailable = useCarrito.filter(obj => responseJSON.ticketsAvailable.some(f => f.seatInfo === obj.seatInfo))
      setCarrito(newCarrito)
      setCartErr(notAvailable)
    } else {
      fetch('https://dentraliaserver.herokuapp.com/api/v1/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventoId: useId.evento,
          entradasOBJ: useCarrito,
        })
      })
      console.log(useId)
      setId(useId)
      setPayload(useCarrito)
      navigate(`/misdatos/${useId.evento}`)
    }
  }
  const handleSeguro = (string, index) => {
    console.log(string, index)
    const itemCarrito = useCarrito[index]
    const seguroEntrada = {
      ...itemCarrito,
      seguro: itemCarrito.seguro ? !itemCarrito.seguro : true
    }
    const newCarrito = useCarrito.map((item, indexCart) => indexCart === index ? item = seguroEntrada : item)
    setCarrito(newCarrito)
  }

  const emptyCart = () => {
    setCarrito([])
    document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'))
  }
  // const dibujarGrid = (disX, disY, lineWidth, color) => {
  //   if(document.getElementById('cuadricula')) {
  //     const ctx = document.getElementById('cuadricula').getContext("2d")
  //     // const canvas = document.getElementById('canvasContainer').getBoundingClientRect()
  //     ctx.scale(1.5, 1.5)
  //     ctx.canvas.width = 1600;
  //     ctx.canvas.height = ;
  //     ctx.strokeStyle = color
  //     ctx.lineWidth = lineWidth
  //     for (let i = disX; i< (ctx.canvas.width); i += disX) {
  //       // Lineas Verticales
  //       ctx.beginPath()
  //       ctx.moveTo(i, 0)
  //       ctx.lineTo(i, ctx.canvas.height)
  //       ctx.stroke()
  //     }
  //     for (let i = disY; i< (ctx.canvas.height); i += disY) {
  //       // Lineas horizontales
  //       ctx.beginPath()
  //       ctx.moveTo(0, i)
  //       ctx.lineTo(ctx.canvas.width, i)
  //       ctx.stroke()
  //     }
  //   }
  // }

  const moveLeft = () => {
    setActiveBtn(true)
    document.getElementById('canvasHolder').scrollLeft += -100
  }

  const moveRight = () => {
    setActiveBtn(false)
    document.getElementById('canvasHolder').scrollLeft += 100
  }
  return (
    <>
      <PianoFlyer checkout={false} />
      <div className='contenedor reserve-contenedor'>
        <div className='reserve-seat'>
          <div className="Plano">
            <div className="scrollingTools">
              <button className={activeBtn ? "active" : ""} onClick={() => moveLeft()}>Área Izquierda</button>
              <button className={activeBtn ? "" : "active"} onClick={() => moveRight()}>Área Derecha</button>
            </div>
            <div id='canvasHolder' className='canvasContainer scrollingOverflow'>
              <div className="stageContainer">
                <strong>&nbsp;Escenario&nbsp;</strong>
              </div>
              {usePlano ? ReactHtmlParser(usePlano.plano, {
                transform(node, index) {
                  if (node.data === ',') {
                    return null
                  }
                }
              }) : ''}
              <canvas id='cuadricula'></canvas>
            </div>
          </div>
          <section className='cartAndError'>
          <div className='zonasCart'>
            <div className='zonasPrices'>
              {usePlano && usePlano.zonas ? usePlano.zonas.map(function (zona) {
                if (zona.name === 'Bloqueada') {
                  return (
                    <div className='zona'>
                      <div className='zonaColor' style={{ color: zona.color }}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <g>
                            <path d="M12.9508 31.3656C12.9508 31.3766 12.9508 31.3862 12.9508 31.3959C13.9856 33.2208 14.5272 35.2837 14.5223 37.3815V39.6984C18.9405 37.9704 24.1082 37.059 29.5093 37.059C36.6699 37.059 41.9282 38.6196 44.6967 39.6916L44.7158 37.3801C44.7158 34.8834 45.3047 32.6504 46.3355 30.8399L48.6688 15.4672C49.2714 11.5239 48.2296 7.75214 45.7315 4.84507C43.0824 1.76789 39.0705 0 34.725 0H24.5159C20.1621 0 16.1432 1.76789 13.5038 4.84919C11.0086 7.75768 9.96546 11.5295 10.5681 15.4701L12.9508 31.3656Z" fill={zona.color} />
                            <path d="M54.2929 28.8237C49.8087 28.8237 47.4631 33.1293 47.4631 37.3802V39.9276C47.4631 40.8761 47.0184 41.7655 46.2992 42.2444C45.6778 42.6624 44.8874 42.7381 44.1978 42.4462C41.7958 41.4594 36.6981 39.8041 29.5115 39.8041C24.2505 39.8041 19.2476 40.7182 15.0434 42.4462C14.3537 42.7393 13.5626 42.664 12.9407 42.2458C12.2228 41.7655 11.7769 40.8732 11.7769 39.929V37.3802C11.7769 32.5763 8.48272 28.8237 4.27177 28.8237C1.95353 28.8237 0.687988 31.5687 0.687988 32.9687C0.687988 34.6708 1.88353 36.5813 3.35353 37.2237C3.50318 37.2896 3.66789 37.361 3.84353 37.424C5.17766 37.9566 7.65919 38.9462 7.65919 41.7902V47.3079C7.65919 49.3667 8.10248 53.8961 11.8071 54.7485C11.7941 54.7981 11.7839 54.8486 11.7769 54.8994V57.6445C11.7769 58.4025 12.3914 59.0171 13.1495 59.0171H14.522C15.2801 59.0171 15.8946 58.4025 15.8946 57.6445V54.9021H43.3457V57.6473C43.3457 58.4053 43.9602 59.0199 44.7183 59.0199H46.0909C46.8489 59.0199 47.4635 58.4053 47.4635 57.6473V54.9022C47.4635 54.8638 47.4443 54.8308 47.4415 54.7938C50.8221 54.1487 51.5811 50.4606 51.5811 47.312V41.7943C51.5811 38.9476 54.0517 37.9581 55.3817 37.4255C55.5533 37.3569 55.7153 37.2882 55.8635 37.2264C57.2512 36.6156 58.3341 34.7435 58.3341 32.9714C58.3351 31.5496 56.6276 28.8237 54.2929 28.8237Z" fill={zona.color} />
                          </g>
                        </svg>
                      </div>
                      <div
                        key={zona.name}
                        className="zonaDatos"
                      >
                        <span className="">{zona.name}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='zona'>
                      <div className='zonaColor' style={{ color: zona.color }}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                          <g>
                            <path d="M12.9508 31.3656C12.9508 31.3766 12.9508 31.3862 12.9508 31.3959C13.9856 33.2208 14.5272 35.2837 14.5223 37.3815V39.6984C18.9405 37.9704 24.1082 37.059 29.5093 37.059C36.6699 37.059 41.9282 38.6196 44.6967 39.6916L44.7158 37.3801C44.7158 34.8834 45.3047 32.6504 46.3355 30.8399L48.6688 15.4672C49.2714 11.5239 48.2296 7.75214 45.7315 4.84507C43.0824 1.76789 39.0705 0 34.725 0H24.5159C20.1621 0 16.1432 1.76789 13.5038 4.84919C11.0086 7.75768 9.96546 11.5295 10.5681 15.4701L12.9508 31.3656Z" fill={zona.color} />
                            <path d="M54.2929 28.8237C49.8087 28.8237 47.4631 33.1293 47.4631 37.3802V39.9276C47.4631 40.8761 47.0184 41.7655 46.2992 42.2444C45.6778 42.6624 44.8874 42.7381 44.1978 42.4462C41.7958 41.4594 36.6981 39.8041 29.5115 39.8041C24.2505 39.8041 19.2476 40.7182 15.0434 42.4462C14.3537 42.7393 13.5626 42.664 12.9407 42.2458C12.2228 41.7655 11.7769 40.8732 11.7769 39.929V37.3802C11.7769 32.5763 8.48272 28.8237 4.27177 28.8237C1.95353 28.8237 0.687988 31.5687 0.687988 32.9687C0.687988 34.6708 1.88353 36.5813 3.35353 37.2237C3.50318 37.2896 3.66789 37.361 3.84353 37.424C5.17766 37.9566 7.65919 38.9462 7.65919 41.7902V47.3079C7.65919 49.3667 8.10248 53.8961 11.8071 54.7485C11.7941 54.7981 11.7839 54.8486 11.7769 54.8994V57.6445C11.7769 58.4025 12.3914 59.0171 13.1495 59.0171H14.522C15.2801 59.0171 15.8946 58.4025 15.8946 57.6445V54.9021H43.3457V57.6473C43.3457 58.4053 43.9602 59.0199 44.7183 59.0199H46.0909C46.8489 59.0199 47.4635 58.4053 47.4635 57.6473V54.9022C47.4635 54.8638 47.4443 54.8308 47.4415 54.7938C50.8221 54.1487 51.5811 50.4606 51.5811 47.312V41.7943C51.5811 38.9476 54.0517 37.9581 55.3817 37.4255C55.5533 37.3569 55.7153 37.2882 55.8635 37.2264C57.2512 36.6156 58.3341 34.7435 58.3341 32.9714C58.3351 31.5496 56.6276 28.8237 54.2929 28.8237Z" fill={zona.color} />
                          </g>
                        </svg>
                      </div>
                      <div
                        key={zona.name}
                        className="zonaDatos"

                      >
                        <span>
                          {zona.name}:
                          {' ' +
                            new Intl.NumberFormat('es-ES', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(zona.price)}
                          GDG:
                          {' ' +
                            new Intl.NumberFormat('es-ES', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(zona.gdg)}
                        </span>
                      </div>
                    </div>
                  )
                }
              }) : ''}
            </div>
          </div>
          <div className='errorContainer'>
              {cartErr.length ? (
                <div className='errorSection'>
                  <p>Los siguientes asientos fueron reservados y se han quitado de su carrito, por favor reviselo e intente nuevamente</p>
                  {cartErr.map((item) => (
                    <ul>
                      <li>{item.zonaName}, {item.seatInfo}, {Intl.NumberFormat('es-es', { style: 'currency', currency: 'EUR' }).format((Number(item.zonaPrice) + Number(item.zonaGDG)))}</li>
                    </ul>
              ))}
                </div>
              ) : ('')
              }
          </div>
          </section>
        </div>
        <div className='entradasCart-btn-wrap'>
          <div className="entradasCart">
            {useCarrito.length > 0 ? (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Zona</th>
                      <th>Fila y Asiento</th>
                      <th>Seguro</th>
                      <th>Asegurar entrada</th>
                      <th>Precio asiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useCarrito.map((item, index) => (
                      <tr key={item.dbstring}>
                        <td>{item.zonaName}</td>
                        <td>{item.seatInfo}</td>
                        <td>{item.seguroPrice}</td>
                        <td className="">
                          <label className="form-check-label" htmlFor={`seguro-${item.dbstring}`}>Si &nbsp;</label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={`seguro-${item.dbstring}`}
                            checked={item.seguro ? item.seguro : false}
                            onChange={() => handleSeguro(item.dbstring, index)}
                          />
                          <picture className='mx-2' onClick={() => setOpacity(!useOpacity)} onMouseEnter={() => setOpacity(1)} onMouseLeave={() =>setOpacity(0)}>
                          <FontAwesomeIcon icon={faCircleInfo} />
                            <tool-tip role="tooltip" style={{opacity: useOpacity}}>
                              <strong>¿Qué está asegurado?</strong>
                              <ul>
                                <li>Cancelación voluntaria antes de 24 horas del inicio del evento</li>
                                <li>Anulación hasta un límite de 200€ por persona</li>
                                <li>Enfermedad grave o fallecimiento del asegurado o de sus familiares</li>
                                <li>Accidente corporal grave del asegurado o de sus familiares</li>
                                <li>Perjuicios graves en la residencia habitual o local profesional del asegurado</li>
                                <li>Despido laboral</li>
                                <li>Citación en un procedimiento judicial</li>
                                <li>Avería o accidente del vehículo propiedad del asegurado</li>
                                <li>Traslado geográfico del puesto de trabajo</li>
                                <li>Demora de la llegada del medio de transporte público que utilice el asegurado para llegar al evento</li>
                                <li>Se puede ejercer el derecho a devolución antes del inicio del espectáculo, una vez haya empezado ya no se puede hacer uso de él</li>
                              </ul>
                            </tool-tip>
                          </picture>
            
                        </td>
                        <td>{Intl.NumberFormat('es-es', { style: 'currency', currency: 'EUR' }).format((Number(item.zonaPrice) + Number(item.zonaGDG)))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className="emptyCard">
                  <span>No hay elementos en el carrito</span>
                  <Image src="/images/cart-is-empty.png" />
                </div>
                {/* <button className="btn btn-primary" onClick={handleSendPay}>
              Generar entradas Total {useCarrito.length > 0 ? Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR'}).format(useCarrito.reduce((a, b) => {
                if (b.seguro) {
                  return a + b.fullPrice
              } else return a + b.sinSeguro
              }, 0)) : 'precio'}
            </button> */}
              </>
            )}
          </div>
          {
            !isDesktop ? (<div className="mobileInsurance">
              {useCarrito.filter(item => item.seguro).length ? (<>
                            <strong>¿Qué está asegurado?</strong>
                              <ul>
                                <li>Cancelación voluntaria antes de 24 horas del inicio del evento</li>
                                <li>Anulación hasta un límite de 200€ por persona</li>
                                <li>Enfermedad grave o fallecimiento del asegurado o de sus familiares</li>
                                <li>Accidente corporal grave del asegurado o de sus familiares</li>
                                <li>Perjuicios graves en la residencia habitual o local profesional del asegurado</li>
                                <li>Despido laboral</li>
                                <li>Citación en un procedimiento judicial</li>
                                <li>Avería o accidente del vehículo propiedad del asegurado</li>
                                <li>Traslado geográfico del puesto de trabajo</li>
                                <li>Demora de la llegada del medio de transporte público que utilice el asegurado para llegar al evento</li>
                                <li>Se puede ejercer el derecho a devolución antes del inicio del espectáculo, una vez haya empezado ya no se puede hacer uso de él</li>
                              </ul>
                            </>)
                            : ('')}
            </div>
            ) : ('')
          }
          <div className="cartActions">
            {/* {isDesktop ? (
              <> */}
            <button className="btn" onClick={() => navigate('/')}><span>Cambiar Evento</span></button>
            <button className="btn" onClick={handleSendPay}><span>Continuar</span></button>
            <button className="btn emptyCart" onClick={emptyCart}><span><FontAwesomeIcon icon={faDeleteLeft} />Borrar seleccion</span></button>
            {/* </>
            ) : ''} */}
          </div>
        </div>
        {/* {isDesktop ? '' : (
          <div className="mobile cartDisplay">
            <div className="cartModal" onClick={() => setShowCart(true)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <div className="subtotalInfo">
                Subtotal <br />
                {
                  useCarrito.length > 0 ? Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(useCarrito.reduce((a, b) => {
                    if (b.seguro) {
                      return a + b.fullPrice
                    } else return a + b.sinSeguro
                  }, 0)) : ''}
              </div>
            </div>
            <div className="mobile successCart">
              <button className="btn btn-success d-flex flex-column" onClick={handleSendPay}>Continuar</button>
            </div>
          </div>
        )} */}
        <Modal show={showCart} onHide={() => setShowCart(false)} backdrop="static" keyboard="" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            {useCarrito.length > 0 ? (
              <>
                <div className="col">
                  {useCarrito.map((item, index) => (
                    <>
                      <div className="row" key={item.dbstring}>
                        <p className="col">
                          <strong>{item.seatInfo}</strong><br />
                          {item.reducedMobility ? (
                            <>
                              <strong>Movilidad Reducida</strong><br />
                            </>
                          ) : ''}
                          Precio con GDG: {Intl.NumberFormat('es-es', { style: 'currency', currency: 'EUR' }).format((Number(item.zonaPrice) + Number(item.zonaGDG)))}<br />
                          Precio con seguro: {Intl.NumberFormat('es-es', { style: 'currency', currency: 'EUR' }).format((Number(item.zonaPrice) + Number(item.zonaGDG) + Number(item.seguroPrice)))}
                        </p>
                        <div className="col form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={`seguro-${item.dbstring}`}
                            checked={item.seguro ? item.seguro : false}
                            onChange={() => handleSeguro(item.dbstring, index)}
                          />
                          <label className="form-check-label" htmlFor={`seguro-${item.dbstring}`}>¿Asegurar entrada?
                          </label>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
                <button className="btn btn-primary">
                  Generar entradas Total {
                    useCarrito.length > 0 ? Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(useCarrito.reduce((a, b) => {
                      if (b.seguro) {
                        return a + b.fullPrice
                      } else return a + b.sinSeguro
                    }, 0)) : 'precio'}
                </button>
                <Button variant="danger" onClick={() => setCarrito([])}>Vaciar Carrito</Button>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center">
                  <span>No hay elementos en el carrito</span>
                </div>
                <hr />
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Planos