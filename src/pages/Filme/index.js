import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css';
import api from "../../services/api";
import { toast } from "react-toastify";


export default function Filme() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key: '96fe86e1103e705d4b32b8218c7a2979',
          language: 'pt-BR',
        }
      })
      .then((response)=>{
        // console.log(response.data)
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log('Filme não encontrado!');
        navigate("/", { replace: true});
        return;
      })
    }
    loadFilme();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO.')
    }

  }, [navigate, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    const hasFilme = filmesSalvos.some((movieSalvo) => movieSalvo.id === filme.id)

    if(hasFilme){
      toast.warn('Esse filme já foi cadastrado!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')

  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

    return (
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://images.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10</strong>
      
        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target='blank' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
      </div>
    );
  }
  
