import { useContext, useEffect, useState } from 'react';
import Evento from './Evento'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, Query, where, getDocs } from "firebase/firestore";
import { QueryContext } from '../context/QueryContext';

const EventGenerator = () => {
    const { useQuery } = useContext(QueryContext)

    const [useEvents, setEvents] = useState([])
    useEffect(() => {
        async function retrieveEvents() {
            let queryPath = ''
            useQuery === '' || useQuery === []
                ? queryPath = query(collection(db, 'Eventos'), where("state", "==", "Activo"), orderBy('unixDateStart', 'asc'))
                : queryPath = query(collection(db, 'Eventos'), where("searchData", "array-contains", useQuery), orderBy('name', 'asc'))
            // const documents = await getDocs(queryPath)
            // documents.forEach(querySnapshot => {
            onSnapshot((queryPath), querySnapshot => {
                setEvents(querySnapshot.docs.map(doc => {
                    const task = doc.data()
                    task.id = doc.id
                    return task
                }))
            })
        }
        retrieveEvents()
    }, [useQuery])

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