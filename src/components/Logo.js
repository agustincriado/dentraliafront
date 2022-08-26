const Logo = ({src, alt}) => {
    return <a href="/"><img className="logoImage" src={`${src}`} alt={`${alt}`}></img></a>
}

export default Logo