import { useContext, useEffect, useState } from 'react';
import Evento from './Evento'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, Query, where } from "firebase/firestore";
import { QueryContext } from '../context/QueryContext';

const EventGenerator = () => {
    const { useQuery } = useContext(QueryContext)

    const [useEvents, setEvents] = useState([])
    useEffect(
        () => {
            let queryPath = ''
            useQuery === '' || useQuery === []
                ? queryPath = query(collection(db, 'Eventos'), orderBy('unixDateStart', 'asc'), where("state", "==", "Activo"))
                : queryPath = query(collection(db, 'Eventos'), where("searchData", "array-contains", useQuery), orderBy('name', 'asc'))
            onSnapshot((queryPath), querySnapshot => {

                setEvents(querySnapshot.docs.map(doc => {
                    const task = doc.data()
                    task.id = doc.id
                    return task
                }))
            })
        }
        , [useQuery])

    return (
        useEvents.map(evento => {
            return <Evento
                eventSrc={evento.webImage}
                key={evento.id}
                eventName={evento.name}
                eventPlace={evento.recintoName}
                eventProvince={evento.province}
                eventUnixDate={evento.unixDateStart}
                eventHour={evento.hourStart}
                eventID={evento.id}
                eventPlano={evento.planoZonas}
            />
        })
    )
}

export default EventGenerator