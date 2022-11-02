import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../context/QueryContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"

const Buscador = () => {
    const [usePath, setPath] = useState("")
    const [ useStyles, setStyles] = useState(false)
    const { setQuery } = useContext(QueryContext)

    useEffect(() => {
        setQuery(usePath)
    }, [usePath, setQuery])
    const handleSubmit = (e) => {
        e.preventDefault()
        const query = e.target['query'].value.toUpperCase()
        console.log('Query value =>', query)
        setPath(query)
    }

    const isMobile = useMediaQuery({
        query: '(max-width: 400px)'
    })

    const changeStyles = () => { setStyles(!useStyles) }
    return (
        <div className="buscador">
            <form className="input-group" onClick={changeStyles} onSubmit={handleSubmit}>
                    <label className="input-group-text">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        style={{height: useStyles ? '0px' : "30px"}}
                        type="text"
                        name="query"
                        className={`form-control ${useStyles ? 'show' : 'hide'}`}
                        placeholder={"Buscar Eventos por nombre o ciudad"}
                    />
                </label>
            </form>
        </div>
    )
}

export default Buscador