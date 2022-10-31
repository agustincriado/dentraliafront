import { useEffect, useState } from "react"
import { useAux } from "../context/auxContext"
const Flyer = () => {

  const initialValues = {
    text: 'Creamos Experiencias',
    subtext: 'Inolvidables',
    info: '#culturasegura',
    imgsrc: '/images/banner-img.png'
  }
  const { useId } = useAux()
  const [useValues, setValues] = useState(initialValues)
  useEffect(() => {
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
    <div className="homeFlyer">
      {useValues === initialValues ? (
        <>
          <img className="homeFlyer-image" src={useValues.imgsrc}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <h4 className="flyerText">{useValues.text} {useValues.subtext}</h4>
                <span>{useValues.info}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={useValues.imgsrc} style={{opacity: 0.3, maxHeight: "10 0px"}}></img>
          {/* <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <div className="homeFlyer-logo-wrap">
                  <img src='/images/festentradas-logo.png' alt="Festentradas" className="festentradas"/>
                  <p>Experiencias</p>
                </div>
                <h4 className="flyerText">{useValues.text} {useValues.subtext}</h4>
                <span>{useValues.info}</span>
              </div>
            </div>
          </div> */}
        </>
      )}

    </div>
  )
}

export default Flyer