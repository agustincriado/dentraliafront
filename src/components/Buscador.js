import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../context/QueryContext"

const Buscador = () => {
    const [usePath, setPath] = useState("")
    const {useQuery, setQuery} = useContext(QueryContext)
    useEffect(()=> {
        setQuery(usePath)
    }, [usePath, setQuery])
    const handleSubmit = (e) => {
        e.preventDefault()
        const query = e.target['query'].value
        setPath(query)
    }
    
    return (
        <div className="buscador">
            <form onSubmit={handleSubmit}>
            <h3>¿Qué buscas?</h3>
            <input
                type="text"
                name="query"
                className="form-control"
                placeholder="Introduce el nomre del evento o la cuidad"
            />
            </form>
        </div>
    )
}

export default Buscador