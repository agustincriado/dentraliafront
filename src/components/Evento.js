import { useAux } from "../context/auxContext"
import { useContext } from "react"
import { useNavigate } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"

const Evento = (evento) => {
    const { setId } = useAux()
    const navigate = useNavigate()
    const Days = ['DOM','LUN', 'MART', 'MIER', 'JUE', 'VIE', 'SAB']
    const Months = ['','ENE', 'FEB', 'MAR', 'ABR', 'JUN', 'JUL', 'AGO', 'SEPT', 'OCT', 'NOV', 'DIC']
    const handleClick = (e) => {
        setId({
            evento:e.target.id,
            plano: e.target.dataset.planoid,
            eventName: e.target.dataset.eventname
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
          onClick={(e) => handleClick(e)}
        >
            <div className="eventImage">
                <img src={evento.eventSrc === '' ? 'https://mgt-media.fra1.cdn.digitaloceanspaces.com/varios/festentradas-logo.png' : evento.eventSrc} alt={evento.eventName}></img>
                <article className="eventDate">
                    <h6 className="eventDay">{Days[eventDay]} <span>{eventDate}</span></h6>
                    <h6 className="eventMonth">{Months[eventMonth]}</h6>
                    <small className="eventHour">
                      <FontAwesomeIcon icon={faClock}/>
                      {evento.eventHour}</small>
                </article>
            </div>
            <div className="eventName">
                <h5>{evento.eventName}</h5>
                <h6>{evento.eventPlace}</h6>
                <small><FontAwesomeIcon icon={faLocationDot}/>{evento.eventProvince}</small>
            </div>
        </div>
    )
}

export default Evento