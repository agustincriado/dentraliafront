import { useEffect, useState } from "react"
import Logo from "./Logo"
import { useAux } from "../context/auxContext"
import { Breadcrumb, Image } from 'react-bootstrap';
const CheckoutFlyer = ({ checkout }) => {

  
  const initialValues = {
    text: 'Creamos Experiencias',
    subtext: 'Inolvidables',
    info: '#culturasegura',
    imgsrc: '/images/piano-banner-bg.png'
  }
  const { useId } = useAux()
  const [useValues, setValues] = useState(initialValues)
  useEffect(() => {
    console.log("Checkout",checkout)
    if (useId === '') {
      setValues(initialValues)
    } else {
      // console.log("seteando values")
      setValues({
        ...useValues,
        text: useId.eventName,
        subtext: useId.eventDate,
        info: useId.eventLocation,
        imgsrc: useId.imgsrc ? useId.imgsrc : initialValues.imgsrc
      })
    }
  }, [useId])
  return (
    <div className="homeFlyer checkoutFlyer">
        <>
          <img className="checkoutImage" src={useValues.imgsrc}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
              </div>
            </div>
          </div>
        </>
      </div>
  )
}

export default CheckoutFlyer