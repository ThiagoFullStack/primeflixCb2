import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

// SITE https://www.themoviedb.org/settings/api

// URL DA API:  movie/now_playing?api_key=96fe86e1103e705d4b32b8218c7a2979&language=pt-BR

// img src={`https://images.tmdb.org/t/p/original/${filmes.nomeDoArquivoDaImagem}`} alt={filmes.title}


export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

async function loadFilmes(){
  const response = await api.get('movie/now_playing', {
    params:{
      api_key: '96fe86e1103e705d4b32b8218c7a2979',
      language: 'pt-BR',
      page: 1,
    }
  })
  // console.log(response.data.results.slice(0, 10));
  setFilmes(response.data.results.slice(0, 10));
  setLoading(false);
}

loadFilmes();

  },[])

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }
    return (
      <div className="container">
       <div className="lista-filmes">
        {filmes.map((filmes) => {
          return(
            <article key={filmes.id}>
              <strong>{filmes.title}</strong>
              <img src={`https://images.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title} />
              <Link className="" to={`/filme/${filmes.id}`}>Acessar</Link>
            </article>
          )
        })}
       </div>
      </div>
    );
  }
  
