import { useAux } from "../context/auxContext"
import { useNavigate } from "react-router"
import { Col, Image } from "react-bootstrap"

const Evento = (evento) => {
    const { setId } = useAux()
    const navigate = useNavigate()
    const Days = ['DOM', 'LUN', 'MART', 'MIER', 'JUE', 'VIE', 'SAB']
    const Months = ['', 'ENE', 'FEB', 'MAR', 'ABR', 'JUN', 'JUL', 'AGO', 'SEPT', 'OCT', 'NOV', 'DIC']
    const handleClick = (e) => {
        setId({
            evento: e.target.id,
            plano: e.target.dataset.planoid,
            eventName: e.target.dataset.eventname,
            eventDate: e.target.dataset.eventdate,
            eventLocation: e.target.dataset.eventlocation
        })
        console.log(e.target.id, "e.target.id")
        navigate('/evento/' + e.target.id)
    }
    const dateObject = new Date(evento.eventUnixDate * 1000)
    const eventDay = dateObject.getDay()
    const eventMonth = dateObject.getMonth()
    const eventDate = dateObject.getDate()

    return (
        <Col xl={4} sm={6} className="event-col">
            <div
                className="eventCard"
                id={evento.eventID}
                data-planoid={evento.eventPlano}
                data-eventname={evento.eventName}
                data-eventdate={Days[eventDay] + "., " + Months[eventMonth] + "., " + evento.eventHour}
                data-eventlocation={evento.eventPlace + ' | ' + evento.eventProvince}
                onClick={(e) => handleClick(e)}
            >
                <div className="eventImage">
                    <img src={evento.eventSrc === '' ? 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' : evento.eventSrc} alt={evento.eventName}></img>
                </div>
                <div className="eventData">
                    <h6 className="eventDate">{Days[eventDay]}., {eventDate} {Months[eventMonth]}., {evento.eventHour}</h6>
                    <h5 className="eventName">{evento.eventName}</h5>
                    <p>{evento.eventPlace}</p>
                    <span><Image src="/images/location-dot.png" /> {evento.eventProvince}</span>
                    <div className="eventBook">
                        <button className="btn">Reservar ahora</button>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Evento