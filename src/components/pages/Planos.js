import {db} from '../../firebase'
import { doc, getDoc, onSnapshot, collection, updateDoc, setDoc, addDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser'
import { useNavigate } from 'react-router-dom'
import { useAux } from '../../context/auxContext';

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

    useEffect(()=> {
      console.log('Calling to useEffect', useId, usePlano)
      if(useId === '') navigate('/404')
        console.log("seteando listeners")
        document.querySelectorAll('span[data-bs-content]').forEach(seat => 
          seat.addEventListener('click', (e) => {
            const node = e.target
            node.classList.toggle('selected')
            const nodeRow = node.dataset.rowId
            const nodeCol = node.dataset.colId

            const nodePrice = Number(node.getAttribute('data-zonaprice'))
            const nodeZonaName = node.getAttribute('data-zonaname')
            const dbid = node.getAttribute('data-dbid')
            const dbstring = node.getAttribute('data-dbstring')
            const getGDG = usePlano.zonas.filter(function(obj) {
              if(obj.name === nodeZonaName) return obj
            })

            const ticket = usePlano.entradas.filter(function(obj) {
              if (obj.row === nodeRow && obj.col === nodeCol) {
                return obj
              } else return null
            })
            const fullSeat = {...ticket[0],
              zona: nodeZonaName,
              price: nodePrice,
              dbid: dbid,
              dbstring: dbstring,
              zonaGDG: getGDG[0].gdg,
            }
            // En este punto ya se recibe por parametros El ID del evento y del PLANO DE ZONAS
            // para poder seguir trabajando en las entradas
            //  if node does not have classlist selected active, delete it from the array
            // if node is selected then push it into the array
            if (node.classList.contains('selected')) {
              setCarrito(prevCarrito => [...prevCarrito, fullSeat])

            } else if (!node.classList.contains('selected')) {
              setTicket(fullSeat)
            }
          })
        )

    }, [isLoaded])

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

    return (
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
      <section className='cart'>
        <span>Carrito</span>
        {useCarrito?.map(ticket => <p>{ticket.seatInfo} - {ticket.zona}</p>)}
      </section>
    </section>
    <button className='btn btn-primary btnPago' onClick={handleSendPay}>Realizar pago</button>
    </section>
    )
}

export default Planos