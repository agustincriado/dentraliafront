import { useAux } from "../context/auxContext"
import { useNavigate } from "react-router"

const Evento = (evento) => {
    const { setId } = useAux()
    const navigate = useNavigate()
    const Days = ['DOM','LUN', 'MART', 'MIER', 'JUE', 'VIE', 'SAB']
    const Months = ['','ENE', 'FEB', 'MAR', 'ABR', 'JUN', 'JUL', 'AGO', 'SEPT', 'OCT', 'NOV', 'DIC']
    const handleClick = (e) => {
        setId({
            evento:e.target.id,
            plano: e.target.dataset.planoid,
            eventName: e.target.dataset.eventname,
            eventDate: e.target.dataset.eventdate,
            eventLocation: e.target.dataset.eventlocation
        })
        navigate('/evento/'+e.target.id)
    }
    // console.log(evento.eventName, evento.eventPlace)
    const dateObject = new Date(evento.eventUnixDate * 1000)
    const eventDay = dateObject.getDay()
    const eventMonth = dateObject.getMonth()
    const eventDate = dateObject.getDate()

    return (
        <div
          className="smallContainer"
          id={evento.eventID}
          data-planoid={evento.eventPlano}
          data-eventname={evento.eventName}
          data-eventdate={Days[eventDay] + "., "  + Months[eventMonth] + "., " +evento.eventHour}
          data-eventlocation={evento.eventPlace + ' | ' + evento.eventProvince}
          onClick={(e) => handleClick(e)}
        >
            <div className="eventImage">
                <img src={evento.eventSrc === '' ? 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' : evento.eventSrc} alt={evento.eventName}></img>
            </div>
            <div className="eventData">
                <h5 className="eventName"><span>{evento.eventName}</span></h5>
                <h6 className="eventDate">{Days[eventDay]}., {Months[eventMonth]}., {evento.eventHour}</h6>
                <small>
                {evento.eventPlace}<br />
                {evento.eventProvince}</small>
                <div className="eventBook">
                    <button className="btn">Reservar ahora</button>
                </div>
            </div>
        </div>
    )
}

export default Evento