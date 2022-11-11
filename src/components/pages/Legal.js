import { useEffect } from "react"
import { useAux } from "../../context/auxContext"
import Flyer from "../Flyer"

const Legal = () => {
    const { useId, setId } = useAux()
    useEffect(() => {
        window.scrollTo(0, 0)
        if(!useId) setId('legal')
    }, [useId]) 
    
 return (
    <>
    <Flyer />
    <div className="container my-5">
<p>
    1. DATOS IDENTIFICATIVOS
    </p>
<p>
    En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos: la empresa titular de dominio web es Ana María Arellano Solera (en adelante Diverfest), con domicilio a estos efectos en Calle Padre Méndez 97, código postal 46900, Torrent, Valencia, número de C.I.F.: 53356306D. Correo electrónico de contacto: hola@diverfest.com del sitio web.
    </p>
<p>
    2. USUARIOS
    </p>
<p>
    El acceso y/o uso de este portal de Diverfest atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
    </p>
<p>
    3. USO DEL PORTAL
    </p>
<p>
    www.diverfest.com proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, “los contenidos”) en Internet pertenecientes a Diverfest o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita. Como consecuencia de este registro, al USUARIO se le puede proporcionar una contraseña de la que será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma. El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios (como por ejemplo servicios de chat, foros de discusión o grupos de noticias) que Nombre de la empresa creadora del sitio web ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para (i) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; (ii) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos; (iii) provocar daños en los sistemas físicos y lógicos de Nombre de la empresa creadora del sitio web , de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados; (iv) intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificaro manipular sus mensajes. Nombre de la empresa creadora del sitio web se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En cualquier caso, Diverfest no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u otras herramientas de participación.
    </p>
<p>
    4. PROTECCIÓN DE DATOS
    </p>
<p>
    Diverfest cumple con las directrices de la Ley Orgánica 15/1999 de 13 de diciembre de Protección de Datos de Carácter Personal, el Real Decreto 1720/2007 de 21 de diciembre por el que se aprueba el Reglamento de desarrollo de la Ley Orgánica y demás normativa vigente en cada momento, y vela por garantizar un correcto uso y tratamiento de los datos personales del usuario. Para ello, junto a cada formulario de recabo de datos de carácter personal, en los servicios que el usuario pueda solicitar a hola@Diverfest.com, hará saber al usuario de la existencia y aceptación de las condiciones particulares del tratamiento de sus datos en cada caso, informándole de la responsabilidad del fichero creado, la dirección del responsable, la posibilidad de ejercer sus derechos de acceso, rectificación, cancelación u oposición, la finalidad del tratamiento y las comunicaciones de datos a terceros en su caso.
    </p>
<p>
    Asimismo, Diverfest informa que da cumplimiento a la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y el Comercio Electrónico y le solicitará su consentimiento al tratamiento de su correo electrónico con fines comerciales en cada momento.
    </p>
<p>
    5. PROPIEDAD INTELECTUAL E INDUSTRIAL
    </p>
<p>
    Diverfest por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial desu página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Diverfest o bien de sus licenciantes.
    </p>
<p>
    Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Diverfest. El USUARIO se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de Diverfest. Podrá visualizar los elementos del portal e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. El USUARIO deberá abstenerse de suprimir, alterar, eludir o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en el las páginas de Diverfest.
    </p>
<p>
    6. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD
    </p>
<p>
    Diverfest no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
    </p>
<p>
    Diverfest es totalmente ajeno al contenido, calidad de sonido, imagen, estado del/los artistas, duración del/los espectáculos una vez comenzados, al igual que queda exenta de toda responsabilidad sobre el estado o imagen de los recintos.
    </p>
<p>
    7. MODIFICACIONES
    </p>
<p>
    Diverfest se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendocambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
    </p>
<p>
    8. ENLACES
    </p>
<p>
    En el caso de que en www.diverfest.com se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, Diverfest no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso Diverfest asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
    </p>
<p>
    Igualmente la inclusión de estas conexiones externas no implicará ningún tipo de asociación, fusión o participación con las entidades conectadas.
    </p>
<p>
    9. DERECHO DE EXCLUSIÓN
    </p>
<p>
    Diverfest se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
    </p>
<p>
    10. GENERALIDADES
    </p>
<p>
    Diverfest perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
    </p>
<p>
    11. MODIFICACIÓN DE LAS PRESENTES CONDICIONES Y DURACIÓN
    </p>
<p>
    Diverfest podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen.
    </p>
<p>
    La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta debidamente publicadas. que sean modificadas por otras.
    </p>
<p>
    12. DEVOLUCIONES
    </p>
<p>
    Bajo ningún concepto se aceptará ni se gestionará la devolución de la/s entrada/s una vez realizada su compra.
    </p>
<p>
    Diverfest declara expresamente que por política de empresa no se realizarán cambios ni devoluciones una vez finalizado el proceso de compra, con la única excepción de los casos de cancelación del evento.
    </p>
<p>
    El mal tiempo, la imposibilidad de asistir al Evento o la comisión de un error en el momento de introducir cualquier dato a lo largo del proceso de compra de entradas al Evento no son motivos que permitan su devolución.
    </p>
<p>
    Te sugerimos revisar toda la información relativa al evento y las condiciones aplicables al mismo antes de confirmar la compra.
    </p>
<p>
    La normativa aplicable en vigor en materia de consumo y de ordenación del comercio minorista establece que en este tipo de adquisiciones el comprador no podrá ejercitar el derecho de desistimiento, ni el de resolución.
    </p>
<p>
    En caso de se produzca la cancelación o cualquier tipo de cambio que afecte a uno de los eventos publicados en nuestra web, hará todo posible para nada más recibir la correspondiente autorización del Organizador, proceder a la publicación de dicha información.. No obstante, no se garantiza que seas informado de la cancelación ya que la responsabilidad de la comunicación es del organizador.
    </p>
<p>
    En el caso de que se decida proceder a la devolución del precio de las entradas que adquiridas , será reembolsado por Diverfest en el mismo medio de pago, dentro del plazo de treinta (30) días hábiles desde la fecha de la comunicación pública de la cancelación.
    </p>
<p>
    En caso de que un evento se postponga o cancele de forma definitiva procederemos a devolver el precio que abonaste por tus entradas.
    </p>
<p>
    Si finalmente no pudieras asistir en la nueva fecha, tendrás un plazo de quince (15) días hábiles para solicitar la devolución del precio que pagaste por las entradas. En cualquier otro caso podremos confirmar tu reserva para el evento, sin derecho a exigir devolución del precio.
    </p>
<p>
    El importe de la devolución será por el precio total de la compra descontando los gastos de gestión que se aplican en las compras al tratarse de los costes del servicio por venta comisionada.
    </p>
<p>
    Diverfest se reserva el derecho de realizar devoluciones de las entradas ya adquiridas por los clientes, si el motivo tiene por objeto garantizar el cumplimiento de la normativa anticovid-19 en los diferentes municipios donde se realiza un evento.
    </p>
<p>
    13. LEGISLACIÓN APLICABLE Y JURISDICCIÓN
    </p>
<p>
    La relación entre Diverfest y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Torrent.
    </p>
    </div>
    </>
 )
}
export default Legal