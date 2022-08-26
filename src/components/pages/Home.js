import EventGenerator from "../EventGenerator"
import Buscador from "../Buscador"
import {QueryContextProvider}  from "../../context/QueryContext"
const Home = () => {
    return (
        <QueryContextProvider>
        <div className="col">
            <div className="buscadorContainer container">
            <Buscador />
            </div>
            <div className="inside container">
            <EventGenerator/>
            </div>
        </div>
        </QueryContextProvider>
    )
}

export default Home