import axios from "axios";

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API:  movie/now_playing?api_key=96fe86e1103e705d4b32b8218c7a2979&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;