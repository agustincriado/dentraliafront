import Flyer from '../Flyer';
const Contact = () => {
    return (
        <>
            <Flyer />
            <div className='contenedor'>
                <div className="inside">
                    <div className="contactContainer">
                        <div className="formContainer">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="inputName">¿Como te llamas?</label>
                                    <input type="text" className="form-control" name="inputName" placeholder="" aria-label="name" required />
                                </div>
                                <div className="col">
                                    <label htmlFor="inputEmail">¿Cual es tu email?</label>
                                    <input type="email" className="form-control" name="inputEmail" placeholder="" aria-label="email" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="inputTel">¿Cual es tu numero de telefono?</label>
                                    <input type="tel" className="form-control" name="inputTel" aria-label="telephone" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="inputText">¿Que necesitas?</label>
                                    <textarea maxLength="5000" data-msg-required="Indica lo que necesitas" rows="10" className="form-control" name="inputText" id="mensaje" required=""></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary btn-lg mb-xlg">Enviar mensaje</button>
                                </div>
                            </div>
                        </div>
                        <div className="textContainer">
                            <h3>Estamos para <span>ayudarte</span></h3>
                            <p>Ind&iacute;canos lo que necesitas y te responderemos con la mayor brevedad posible</p>
                            <p>Si el motivo del mensaje es sobre unas entradas, recuerda indicarnos todos tus datos personales (Nombre, apellidos, e-mail, DNI, n&uacute;mero de tel&eacuite;fono m&oacute;vil, y sobre todo el/los localizador/es de las entradas).</p>
                            <p>Si lo deseas, tambi&eacute;n puedes escribirnos al e-mail <a href="mailto:hola@festentradas.com">hola@festentradas.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact