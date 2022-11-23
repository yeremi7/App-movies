import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Loader } from "../elementos/Loader";
import imgHolder from "../img/holder.jpg";
import * as CRUD from "../Api/FuncionesApi";

const MovieInfo = () => {
    
    const [movieInfo, setMovieInfo] = useState(null);
    let urlImg = "http://image.tmdb.org/t/p/w300";

    const {id} = useParams();

    useEffect(() => {
        
        CRUD.getMovies(`/movie/${id}`).then((resp) => {
            setMovieInfo(resp);
        }).catch((e) => {
            console.log(e);
        });

    },[id])


    return ( 
        <>
            <section className="container_moviesInfo" >

                <h1 className="title_movieInfo" ><Link to='/'> Movie details </Link></h1>

                {movieInfo === null ?
                    <div className="loader_movieInfo" >
                        <Loader />
                    </div>
                :
                    <div className="card_movieInfo">

                        <img className=" size img_poster" src={movieInfo.poster_path ? `${urlImg}${movieInfo.poster_path}` : imgHolder} alt="poster" />
                    
                        <div className=" size content_info">
                            <p> <strong> Title: </strong> {movieInfo.title } </p>
                            <p> <strong> Generos: </strong> {movieInfo.genres.map(el => el.name).join(', ') } </p>
                            <p> <strong> Overview: </strong> {movieInfo.overview} </p>
                            <p> <strong> Production Cuntries: </strong> {movieInfo.production_countries.map(el => el.name).join(', ')} </p>
                        </div>

                    </div>
                }

            </section>
        </>
    );
}
 
export {MovieInfo};