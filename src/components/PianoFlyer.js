import { useEffect, useState } from "react"
import Logo from "./Logo"
import { useAux } from "../context/auxContext"
import { Breadcrumb, Image } from 'react-bootstrap';
const PianoFlyer = ({ checkout }) => {

  
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
    <div className="homeFlyer pianoFlyer">
      {useValues === initialValues ? (
        <>
          <img src={useValues.imgsrc}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <div className="homeFlyer-card">
                  <h5>{useValues.text}</h5>
                  <h6><Image src="/images/clock-icon.svg" /> {useValues.subtext}</h6>
                  <span><Image src="/images/location-dot.svg" />{useValues.info}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={useValues.imgsrc} style={{opacity: checkout ? '0.3' : '1'}}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <div className="homeFlyer-logo-wrap">
                  <img src='/images/dentralia-logo.png' alt="Dentralia Logo" className="festentradas" />
                  <p>Experiencias</p>
                </div>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Experiencias</Breadcrumb.Item>
                  <Breadcrumb.Item active className="breadcrumInfo">{useValues.text}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="homeFlyer-card">
                  <h5>{useValues.text}</h5>
                  <h6><Image src="/images/clock-icon.svg" /> {useValues.subtext}</h6>
                  <span><Image src="/images/location-dot.svg" /> {useValues.info}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PianoFlyer