import React, {useEffect, useState} from "react";
import axios from "./axios";
import './Row.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'
const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }

        fetchData()

    }, [fetchUrl])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    }
    const handleClick=(movie)=>{
        console.log(movie);
        console.log(movie?.name);
        if(trailerUrl){
            setTrailerUrl('');
        }
        else {

            movieTrailer(movie?.original_title||'').then((url)=>{
                console.log(movie);
                console.log(movie?.name);
                const urlParams= new URLSearchParams (new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                console.log('success');
            })
                .catch((error)=>console.log('error',error))
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            onClick={()=>handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    )

                })}
            </div>

            {trailerUrl &&
            <div>
                <span onClick={()=>setTrailerUrl('')} className='close_trailer' title={'close'}>X</span>
                <YouTube videoId={trailerUrl} opts={opts}> </YouTube>
            </div>
            }
        </div>
    )
}
export default Row


//   API KEY = 252da5561f2137154a798b83e2503760;
//  example api request =https://api.themoviedb.org/3/movie/550?api_key=252da5561f2137154a798b83e2503760

// token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTJkYTU1NjFmMjEzNzE1NGE3OThiODNlMjUwMzc2MCIsInN1YiI6IjVmOGFiODJlZTlkYTY5MDAzOGVhZGRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRF7t7l6Dk-MhpfJycWy8VEI5vqRlSQ6OXeoaze_de0