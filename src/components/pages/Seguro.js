import { useEffect } from "react"
import { useAux } from "../../context/auxContext"
import Flyer from "../Flyer"

const Seguro = () => {
    const { useId, setId } = useAux()
    useEffect(() => {
        window.scrollTo(0, 0)
        if(!useId) setId('condiciones-seguro')
    }, [useId])
    return (
        <>    
        <Flyer />
        <div className="container my-5">
        <span>La devolución se realizará del importe íntegro de la entrada, excluyendo los gastos de gestión y el propio importe del seguro contratado</span>

        <p>
            <strong>¿Qué está asegurado?</strong>
            </p>
            <ul>
                <li>Cancelación voluntaria antes de 24 horas del inicio del evento</li>
                <li>Anulación hasta un límite de 200€ por persona</li>
                <li>Enfermedad grave o fallecimiento del asegurado o de sus familiares</li>
                <li>Accidente corporal grave del asegurado o de sus familiares</li>
                <li>Perjuicios graves en la residencia habitual o local profesional del asegurado</li>
                <li>Despido laboral</li>
                <li>Citación en un procedimiento judicial</li>
                <li>Avería o accidente del vehículo propiedad del asegurado</li>
                <li>Traslado geográfico del puesto de trabajo</li>
                <li>Demora de la llegada del medio de transporte público que utilice el asegurado para llegar al evento</li>
                <li>Se puede ejercer el derecho a devolución antes del inicio del espectáculo, una vez haya empezado ya no se puede hacer uso de él</li>
            </ul>
        <p>* Todo lo anteriormente citado se tiene que justificar con la documentación pertinente</p>
        </div>
    </>
    )
}

export default Seguro