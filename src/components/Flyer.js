import { useEffect, useState } from "react"
import { useAux } from "../context/auxContext"
const Flyer = () => {

  const initialValues = {
    text: 'Creamos Experiencias',
    subtext: 'Inolvidables',
    info: '#culturasegura',
    imgsrc: 'https://static.wixstatic.com/media/11062b_a00b7b5d4ae34b6084a026bab8a9239c~mv2.jpeg/v1/fill/w_1903,h_294,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_a00b7b5d4ae34b6084a026bab8a9239c~mv2.jpeg'
  }
  const {useId} = useAux()
  const [useValues, setValues] = useState(initialValues)
  useEffect(() => {
    if (useId === '') {
      setValues(initialValues)
    } else {
      console.log("seteando values")
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
          <img src={useValues.imgsrc}></img>
          <h4 className="flyerText">{useValues.text}<br/>
              <strong className="flyerSubText">{useValues.subtext}</strong></h4>
          <span>{useValues.info}</span>
          </>
        ) : (
          <>
          <img src={useValues.imgsrc}></img>
          <h4 className="flyerText EventData">{useValues.text}<br/>
          <strong className="flyerSubText EventDate">{useValues.subtext}</strong></h4>
          <span>{useValues.info}</span>
          </>
        )}
        
      </div>
    )
}

export default Flyer