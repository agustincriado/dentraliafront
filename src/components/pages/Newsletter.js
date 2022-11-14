import Flyer from '../Flyer';
import { useAux } from '../../context/auxContext';
import { useEffect } from 'react';
const Newsletter = () => {
    const { useId, setId } = useAux()
    useEffect(() => {
        window.scrollTo(0, 0)
      })
    useEffect( () => {
        if(!useId) setId('newsletter')
    })
    return (
        <>
            <Flyer />
            <div className='contenedor'>
                <div className="inside">
                    <div className="formContainer newsletter">
                        <h1>Recibe todas nuestras <span>novedades</span></h1>
                        <hr />
                        <div className="row">
                            <div className="col">
                                <label htmlFor="inputName">¿C&oacute;mo te llamas?</label>
                                <input type="text" className="form-control" name="inputName" placeholder="" aria-label="name" required />
                            </div>
                            <div className="col">
                                <label htmlFor="inputEmail">¿Cu&aacute;l es tu email?</label>
                                <input type="email" className="form-control" name="inputEmail" placeholder="" aria-label="email" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="cpCode">¿Cu&aacute;l es tu codigo postal?</label>
                                <input type="text" className="form-control" name="cpCode" aria-label="postalCode" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary btn-lg mb-xlg">Suscribirme</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter