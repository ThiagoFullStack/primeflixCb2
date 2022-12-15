import { Link } from "react-router-dom"
import './error.css';

export default function Error(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2 className="texto">Ops!,<span> página não existe...</span> </h2>
            <Link className="voltar" to='/'>Voltar para o inicio</Link>
        </div>
    )
}