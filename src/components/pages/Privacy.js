import { useEffect } from "react"
import { useAux } from "../../context/auxContext"
import Flyer from "../Flyer"

const Privacy = () => {
    const { useId, setId } = useAux()
    useEffect(() => {
        window.scrollTo(0, 0)
        if(!useId) setId('privacy')
    }, [useId])

 return (
    <>
    <Flyer />
 <div className="container my-5">
<p>1. Política de privacidad</p>
<p>
    Diverfest, informa a los usuarios del sitio web sobre su política respecto del tratamiento y protección de los datos de carácter personal de los usuarios y clientes que puedan ser recabados por la navegación o contratación de servicios a través de su sitio web.
    </p>
<p>
    En este sentido, Diverfest, garantiza el cumplimiento de la normativa vigente en materia de protección de datos personales, reflejada en la Ley Orgánica 15/1999 de 13 de diciembre, de Protección de Datos de Carácter Personal y en el Real Decreto 1720/2007, de 21 diciembre, por el que se aprueba el Reglamento de Desarrollo de la LOPD.
    </p>
<p>
    El uso de esta web implica la aceptación de esta política de privacidad.
    </p>
<p>
    2. Recogida, finalidad y tratamientos de datos
    </p>
<p>
    Diverfest, tiene el deber de informar a los usuarios de su sitio web acerca de la recogida de datos de carácter personal que pueden llevarse a cabo, bien sea mediante el envío de correo electrónico o al cumplimentar los formularios incluidos en el sitio web. En este sentido, Empresa A será considerada como responsable de los datos recabados mediante los medios anteriormente descritos.
    </p>
<p>
    A su vez Diverfest, informa a los usuarios de que la finalidad del tratamiento de los datos recabados contempla: La atención de solicitudes realizadas por los usuarios, la inclusión en la agenda de contactos, la prestación de servicios, la gestión de la relación comercial y otras finalidades relacionadas.
    </p>
<p>
    Las operaciones, gestiones y procedimientos técnicos que se realicen de forma automatizada o no automatizada y que posibiliten la recogida, el almacenamiento, la modificación, la transferencia y otras acciones sobre datos de carácter personal, tienen la consideración de tratamiento de datos personales.
    </p>
<p>
    Todos los datos personales, que sean recogidos a través del sitio web de Diverfest, y por tanto tenga la consideración de tratamiento de datos de carácter personal, serán incorporados en los ficheros declarados ante la Agencia Española de Protección de Datos por Diverfest.
    </p>
<p>
    3. Comunicación de información a terceros
    </p>
<p>
    Diverfest, informa a los usuarios de que sus datos personales no serán cedidos a terceras organizaciones, con la salvedad de que dicha cesión de datos este amparada en una obligación legal o cuando la prestación de un servicio implique la necesidad de una relación contractual con un encargado de tratamiento. En este último caso, solo se llevará a cabo la cesión de datos al tercero cuando Diverfest, disponga del consentimiento expreso del usuario.
    </p>
<p>
    4. Derechos de los usuarios
    </p>
<p>
    La Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal concede a los interesados la posibilidad de ejercer una serie de derechos relacionados con el tratamiento de sus datos personales.
    </p>
<p>
    En tanto en cuanto los datos del usuario son objeto de tratamiento por parte de Diverfest. Los usuarios podrán ejercer los derechos de acceso, rectificación, cancelación y oposición de acuerdo con lo previsto en la normativa legal vigente en materia de protección de datos personales.
    </p>
<p>
    Para hacer uso del ejercicio de estos derechos, el usuario deberá dirigirse mediante comunicación escrita, aportando documentación que acredite su identidad (DNI o pasaporte), a la siguiente dirección: Diverfest, Calle Padre Méndez 97, código postal 46900, Torrent, Valencia, o la dirección que sea sustituida en el Registro General de Protección de Datos. Dicha comunicación deberá reflejar la siguiente información: Nombre y apellidos del usuario, la petición de solicitud, el domicilio y los datos acreditativos.
    </p>
<p>
    El ejercicio de derechos deberá ser realizado por el propio usuario. No obstante, podrán ser ejecutados por una persona autorizada como representante legal del autorizado. En tal caso, se deberá aportar la documentación que acredite esta representación del interesado.
    </p>
 </div>
 </>

)}

export default Privacy