import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../context/QueryContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

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
            <form className="input-group" onSubmit={handleSubmit}>
            <label className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
            <input
                type="text"
                name="query"
                className="form-control"
                placeholder={"Buscar Eventos por nombre o ciudad"}
            />
            </form>
        </div>
    )
}

export default Buscador