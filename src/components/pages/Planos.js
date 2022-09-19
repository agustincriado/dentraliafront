import {db} from '../../firebase'
import { doc, getDoc, onSnapshot, collection, updateDoc, setDoc, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser'
import { useNavigate } from 'react-router-dom'
import { useAux } from '../../context/auxContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faShoppingCart, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

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

    useEffect(()=> {
      console.log('Calling to useEffect', useId, usePlano)
      if(useId === '') navigate('/')

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
          if(useCarrito.length < 10){
            console.log('adding')
            console.log(useCarrito.length)
            e.target.classList.add('selected')
            const getGDG = usePlano.zonas.filter(function(obj) {
              if(obj.name === e.target.dataset.zonaname) return obj
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
          if (value.dbstring === useTicket.dbstring ) {
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

      if(useId && usePlano.zonas === '') retrievePlano()

      const setHalfPlano = () => {
        const VIEWPORTS = {
          720: 1.9,
          1366: 0.5,
          1400: 0.2
        }
        const ViewportWidth = (value) => {
          if (720 <= value && value <= 1366) {
            return 0.5
          } else if ( value <= 720 && value >= 480) {
            return 1.9
          } else if (value < 480) {
            return 1.6
          }else return 0.2
        }
        const canvas = document.getElementById('canvasHolder')
        console.log("Actual Vierport Width", ViewportWidth(window.innerWidth))
        canvas.scrollLeft = (canvas.offsetWidth*ViewportWidth(window.innerWidth))
        // dibujarGrid(20, 20, 1, '#ececec')
      }
      setHalfPlano()

    }, [])
    
    const handleSendPay = () => {
      useCarrito.forEach(async (entrada) => { 
        await updateDoc(doc(db, 'Eventos', useId.evento, 'Entradas', entrada.dbid), {
          estado: 'Reservado'
        })
        await addDoc(collection(db, 'Eventos', useId.evento, 'Entradas', entrada.dbid, 'Logs'), {
          FechaInitialUnix: Math.floor(new Date().getTime() / 1000),
          registro: 'Cambio de estado Libre a Reservado' 
        })
      })
      useCarrito.forEach(async (entrada) => await setDoc(doc(db, 'MonitorRT', entrada.dbid), {
        ...entrada,
        eventoId: useId.evento,
        eventoName: useId.eventName,
        estado: 'Reservado',
      }))
      fetch('http://localhost:4242/api/v1/timer', {
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
    const handleSeguro = (string, index) => {
      console.log(string, index)
      const itemCarrito = useCarrito[index]
      const seguroEntrada = {...itemCarrito,
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
    return (
      <>
      <section className='eventContainer'>
        <div className="Plano">
          <div className="scrollingTools">
            <button className="btn btn-primary" onClick={() => document.getElementById('canvasHolder').scrollLeft += -100}><FontAwesomeIcon icon={faArrowLeft}/></button>
            <button className="btn btn-primary" onClick={() => document.getElementById('canvasHolder').scrollLeft += 100}><FontAwesomeIcon icon={faArrowRight}/></button>
          </div>
          <div id='canvasHolder' className='canvasContainer scrollingOverflow'>
            <div className="stageContainer">
              <strong> Escenario </strong>
            </div>
              {usePlano ? ReactHtmlParser(usePlano.plano, {
                transform(node, index) {
                  if (node.data === ',') {
                    return null
                  }
                }
              }) : '' }
            <canvas id='cuadricula'></canvas>
          </div>
        </div>
      <section className='zonasCart'>
        <section className='zonasPrices'>
            {usePlano && usePlano.zonas ? usePlano.zonas.map(function (zona) {
              if (zona.name === 'Bloqueada') {
                return (
                  <div className='zona'>
                    <div className='zonaColor' style={{ backgroundColor: zona.color }}>&nbsp;</div>
                    <div
                      key={zona.name}
                      className="col sm-3 d-flex align-items-center zonaDatos"
                      
                    >
                      <span className="">{zona.name}</span>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className='zona'>
                    <div className='zonaColor' style={{ backgroundColor: zona.color }}>&nbsp;</div>
                    <div
                      key={zona.name}
                      className="col sm-3 py-2 zonaDatos"
                      
                    >
                      <span>
                        {zona.name}:
                        {' ' +
                          new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR',
                          }).format(zona.price)}
                      </span>
                      <br />
                      <span>
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
        </section>
      </section>
      <section className="entradasCart">
      { isDesktop ? ( 
      useCarrito.length > 0 ? (
        <>
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
                          checked={item.seguro ? item.seguro : false }
                          onChange={() => handleSeguro(item.dbstring, index)}
                        />
                        </td>
                  <td>{Intl.NumberFormat('es-es', {style: 'currency', currency: 'EUR'}).format((Number(item.zonaPrice)+ Number(item.zonaGDG)))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <span>No hay elementos en el carrito</span>
              </div>
              <hr />
              {/* <button className="btn btn-primary" onClick={handleSendPay}>
              Generar entradas Total {useCarrito.length > 0 ? Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR'}).format(useCarrito.reduce((a, b) => {
                if (b.seguro) {
                  return a + b.fullPrice
              } else return a + b.sinSeguro
              }, 0)) : 'precio'}
            </button> */}
            </>
          )) : ''}
        </section>
        <section className="cartActions d-flex flex-column">
          { isDesktop ? (
            <>
              <button className="btn btn-dark" onClick={() => setId('')}>Cambiar Evento</button>
              <button className="btn btn-dark" onClick={emptyCart}>Borrar seleccion</button>
              <button className="btn btn-success d-flex flex-column" onClick={handleSendPay}><FontAwesomeIcon icon={faTicket} />Continuar</button>
            </>
          ) : ''}
        </section>
        { isDesktop ? '' : (
          <div className="mobile cartDisplay">
            <div className="cartModal" onClick={() => setShowCart(true)}>
              <FontAwesomeIcon icon={faShoppingCart}/>
              <div className="subtotalInfo">
                  Subtotal <br />
                  {
              useCarrito.length > 0 ? Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR'}).format(useCarrito.reduce((a, b) => {
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
        )}
      </section>
      <Modal show={showCart} onHide={() => setShowCart(false)} backdrop="static" keyboard="" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
        { useCarrito.length > 0 ? (
          <>
            <div className="col">
                {useCarrito.map((item, index) => (
                  <>
                    <div className="row" key={item.dbstring}>
                      <p className="col">
                        <strong>{item.seatInfo}</strong><br />
                        {item.reducedMobility ? (
                        <>
                          <strong>Movilidad Reducida</strong><br/>
                        </>
                        ) : ''}
                        Precio con GDG: {Intl.NumberFormat('es-es', {style: 'currency', currency: 'EUR'}).format((Number(item.zonaPrice)+ Number(item.zonaGDG)))}<br />
                        Precio con seguro: {Intl.NumberFormat('es-es', {style: 'currency', currency: 'EUR'}).format((Number(item.zonaPrice)+ Number(item.zonaGDG)+Number(item.seguroPrice)))}
                      </p>
                      <div className="col form-check">
                        <input 
                          className="form-check-input"
                          type="checkbox"
                          name={`seguro-${item.dbstring}`}
                          checked={item.seguro ? item.seguro : false }
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
              useCarrito.length > 0 ? Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR'}).format(useCarrito.reduce((a, b) => {
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
  </>
    )
}

export default Planos