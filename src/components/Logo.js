import { Link } from 'react-router-dom'
const Logo = ({src, alt}) => {
    return <Link to='/'><img className="logoImage" src={`${src}`} alt={`${alt}`}></img></Link>
}

export default Logo