import { useEffect, useState } from "react"
import { useAux } from "../context/auxContext"
const Flyer = () => {
  const initialValues = {
    text: 'Creamos Experiencias',
    subtext: 'Inolvidables',
    imgsrc: '/images/banner-img.png'
  }
  const TEXTS = {
    'about': 'Quiénes somos',
    'events': 'Crea tu evento',
    'faq': 'Preguntas frecuentes',
    'newsletter': 'Newsletter',
    'contact': 'Contacto',
    'privacy': 'Política de privacidad',
    'legal': 'Aviso legal',
  }
  const { useId } = useAux()
  const [useValues, setValues] = useState(initialValues)

  const PAGES = {
    'about': true,
    'events': true,
    'faq': true,
    'newsletter': true,
    'contact': true,
    'privacy': true,
    'legal': true,
}
  useEffect(() => {
    console.log(PAGES[useId], useId)
    if (useId === '' || !useId) {
      setValues(initialValues)
    } else if (PAGES[useId]) {
      console.log(PAGES[useId])
      setValues({...useValues,
        text: TEXTS[useId]
      })

    } else {
      // console.log("seteando values")
      setValues({
        ...useValues,
        text: useId.eventName,
        subtext: useId.eventDate,
        imgsrc: useId.imgsrc ? useId.imgsrc : initialValues.imgsrc
      })
    }
  }, [useId])
  return (
    <div className="homeFlyer">
      {JSON.stringify(useValues) === JSON.stringify(initialValues) ? (
        <>
          <img className="homeFlyer-image" src={useValues.imgsrc}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <h4 className="flyerText">{useValues.text} {useValues.subtext}</h4>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={useValues.imgsrc} style={{maxHeight: "200px"}}></img>
          <div className="homeFlyer-content">
            <div className="container">
              <div className="homeFlyer-inner">
                <h4 className="flyerText" style={{fontSize: "2.6em"}}>{useValues.text}</h4>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Flyer