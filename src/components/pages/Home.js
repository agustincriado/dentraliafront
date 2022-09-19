import EventGenerator from "../EventGenerator"
import { useAux } from "../../context/auxContext"
import { useEffect } from "react"
import Buscador from "../Buscador"
import { useMediaQuery } from "react-responsive"
const Home = () => {
    const {setId, setMinutes, setSeconds} = useAux()
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
      })

    useEffect(() =>{
        setId('')
        setMinutes('08')
        setSeconds('59')
    })
    return (
        <div className="col">
            <div className="buscadorContainer container">
            </div>
            <div className="inside container">
            { isDesktop ? '' : <Buscador />}
            <EventGenerator/>
            </div>
        </div>
    )
}

export default Home