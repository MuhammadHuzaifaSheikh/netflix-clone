import React, {useEffect, useState} from "react";
import axios from '../../config/axios'
import requests from "../../config/Requests";
import './banner.css'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Banner() {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchComedyMovies)
            console.log(request.data.result);
            setMovies(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                    ]
            )
            return request
        }

        fetchData()
    }, [])

    function truncate(str, n) {
        return (str?.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <header className="banner"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(
                  "https://image.tmdb.org/t/p/original/${movies?.backdrop_path} ")`, backgroundPosition: 'center'

                }}
        >
            <div className="banner_contents">
                <h1 className='banner_title'>{movies?.title || movies?.name || movies?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                    {/*movies?.overview*/}
                </div>
                <h1 className="banner_description">{truncate(movies?.overview, 150)}</h1>
            </div>
            {/*<div className="banner_fadeBottom"> </div>*/}

        </header>
    )
}

export default Banner