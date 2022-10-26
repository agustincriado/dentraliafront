import EventGenerator from "../EventGenerator"
import { useAux } from "../../context/auxContext"
import { useEffect } from "react"
import Buscador from "../Buscador"
import { useMediaQuery } from "react-responsive"
import { Row } from "react-bootstrap"
import Flyer from '../Flyer';
const Home = () => {
    const { setId, setMinutes, setSeconds } = useAux()
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    useEffect(() => {
        setId('')
        setMinutes('08')
        setSeconds('59')
    })
    return (
        <>
            <Flyer />
            <div className='contenedor'>
                {/* <div className="buscadorContainer container">
                </div> */}
                {/* {isDesktop ? '' : <Buscador />} */}
                <div className="event-wrap">
                    <h3>Eventos activos</h3>
                    <Row>
                        <EventGenerator />
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Home