import { useState, useEffect} from 'react'
const Carrito = () => {
    const [useCarrito, setCarrito] = useState([])

    const addCarrito = (prop) => {
        let oldCarrito = {...useCarrito}
        setCarrito(oldCarrito, prop.value)
    }
}

export default Carrito