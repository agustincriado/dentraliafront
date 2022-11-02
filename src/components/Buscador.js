import { useContext, useEffect, useState } from "react"
import { QueryContext } from "../context/QueryContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from "react-responsive"

const Buscador = () => {
    const initialStyles = {
        height: "0px",
        padding: "0 20px 0 58px"
    }
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

    const changeStyles = () => { setStyles(!useStyles)}
    return (
        <div className="buscador">
            <form className="input-group" onSubmit={handleSubmit}>
                {isMobile ? (
                    <label onClick={changeStyles} className="input-group-text">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        style={{width: useStyles ? "30px": "0px", padding: useStyles ? '0 20px 0 58px': '0px'}}
                        type="text"
                        name="query"
                        className="form-control"
                        placeholder={"Buscar Eventos por nombre o ciudad"}
                    />
                </label>
                ) : (
                    <label className="input-group-text">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        name="query"
                        className="form-control"
                        placeholder={"Buscar Eventos por nombre o ciudad"}
                    />
                </label>
                )}
                
            </form>
        </div>
    )
}

export default Buscador