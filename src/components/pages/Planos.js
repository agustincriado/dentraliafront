import {db} from '../../firebase'
import { doc, getDoc, onSnapshot, collection, updateDoc, setDoc, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser'
import { useNavigate } from 'react-router-dom'
import { useAux } from '../../context/auxContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

const Planos = () => {
const initialValues = {
  zonas: ''
}

    const navigate = useNavigate()
    const { useId, setId, setPayload } = useAux()
    const [usePlano, setPlano] = useState(initialValues)
    const [useTicket, setTicket] = useState('')
    const [useCarrito, setCarrito] = useState([])
    const [isLoaded, setLoaded] = useState(0)
    const [showCart, setShowCart] = useState(false)

    useEffect(()=> {
      console.log('Calling to useEffect', useId, usePlano)
      if(useId === '') navigate('/404')
        // console.log("seteando listeners")
        // document.querySelectorAll('span[data-bs-content]').forEach(seat => 
        //   seat.addEventListener('click', (e) => {
        //     const node = e.target
        //     node.classList.toggle('selected')
        //     const nodeRow = node.dataset.rowId
        //     const nodeCol = node.dataset.colId

        //     const nodePrice = Number(node.getAttribute('data-zonaprice'))
        //     const nodeZonaName = node.getAttribute('data-zonaname')
        //     const dbid = node.getAttribute('data-dbid')
        //     const dbstring = node.getAttribute('data-dbstring')
        //     const getGDG = usePlano.zonas.filter(function(obj) {
        //       if(obj.name === nodeZonaName) return obj
        //     })

        //     const ticket = usePlano.entradas.filter(function(obj) {
        //       if (obj.row === nodeRow && obj.col === nodeCol) {
        //         return obj
        //       } else return null
        //     })
        //     const fullSeat = {...ticket[0],
        //       zona: nodeZonaName,
        //       price: nodePrice,
        //       dbid: dbid,
        //       dbstring: dbstring,
        //       zonaGDG: getGDG[0].gdg,
        //     }
        //     // En este punto ya se recibe por parametros El ID del evento y del PLANO DE ZONAS
        //     // para poder seguir trabajando en las entradas
        //     //  if node does not have classlist selected active, delete it from the array
        //     // if node is selected then push it into the array
        //     if (node.classList.contains('selected')) {
        //       setCarrito(prevCarrito => [...prevCarrito, fullSeat])

        //     } else if (!node.classList.contains('selected')) {
        //       setTicket(fullSeat)
        //     }
        //   })
        // )

    }, [isLoaded])
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
      setId(useId.evento)
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
    
    return (
      <>
      <section className='eventContainer'>
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
        <button onClick={() => setShowCart(true)} className='btn btn-outline-primary cartModal'>
          <FontAwesomeIcon icon={faCartShopping} className="fa-regular fa-cart-shopping" />
        </button>
      </section>
      <button className='btn btn-primary btnPago' onClick={handleSendPay}>Realizar pago</button>
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
            <button className="btn btn-primary" onClick={handleSendPay}>
              Generar entradas Total {useCarrito.length > 0 ? Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR'}).format(useCarrito.reduce((a, b) => {
                if (b.seguro) {
                  return a + b.fullPrice
              } else return a + b.sinSeguro
              }, 0)) : 'precio'}
            </button>
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