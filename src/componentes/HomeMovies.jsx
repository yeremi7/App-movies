import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import  * as CRUD  from "../Api/FuncionesApi";
import { Loader } from "../elementos/Loader";
import { NoResults } from "../elementos/NoResults";
import { useDebounce } from "../hook/useDebounce";
import imgHolder from "../img/holder.jpg";

const HomeMovies = () => {

    const [movies,           setMovies]              = useState([]);
    const [page,             changePage]             = useState(1);
    const [controlAnimate,   changeControlAnimate]   = useState(true);
    const [hasMore,          changeHasMore]          = useState(true);
    const [messageNoResults, changeMessageNoResults] = useState(false);

    let navigate       = useNavigate();
    let search         = useLocation().search.split('=').pop();
    let searchDebounce = useDebounce(search , 700);
    let urlImg         = "http://image.tmdb.org/t/p/w200";
    
    useEffect(()=> setMovies([]) ,[searchDebounce]);

    useEffect(() => {

        !searchDebounce && navigate("/");

        let searchUrlMovies = searchDebounce ?
            `/search/movie?query=${searchDebounce}&page=${page}` :
            `/discover/movie?page=${page}` ;
    
        CRUD.getMovies(searchUrlMovies).then((res) => {
            
            setMovies( (moreMovies) => moreMovies.concat(res.results) );
            changeHasMore(res.page < res.total_pages);
            res.results.length === 0 ? changeMessageNoResults(true) : changeMessageNoResults(false)
            
        }).catch((e) => {
            console.log(e);
        })
        
    },[searchDebounce, page, navigate]);


    const searchMovies = (e) => {
        setMovies([]);
        changePage(1);
        changeHasMore(true);
        changeMessageNoResults(false);
        navigate(`/?search=${e.target.value.toLowerCase()}`);
    };

    const animateClip = (id) => {
        const listClip = document.querySelectorAll('.clip');

            listClip.forEach((elm ,index) => {
                const openClip = elm.classList.contains('openClip');
                
                if (controlAnimate === true) {    
                    changeControlAnimate(false);
                    if (id === index)  elm.classList.toggle('openClip');
                    else if (openClip) elm.classList.remove('openClip');
                }
                elm.addEventListener('transitionend', () => changeControlAnimate(true));
            });
    };
   
    return ( 
        <>
            <InfiniteScroll
                dataLength={movies.length} 
                next={() => changePage((prev) => prev + 1 ) }
                hasMore={hasMore}
                loader={ <div style={{width:'100%', textAlign:'center', margin: '47px 0'}}> <Loader/> </div> }
            >

                <section className="container_header">

                    <h1 className="title"> Movies Cine </h1>

                    <input 
                        className="inputSearchMovies"
                        type="text"
                        placeholder="buscar"
                        value={search}
                        onChange={(e) => searchMovies(e)}
                    />   

                    <div className="container_movies">
                        <div className="container_moviesCard">

                            {movies === null ? 
                                <Loader />
                            :
                                messageNoResults ?
                                    < NoResults/>    
                                :
                                    movies.map((pelis, index) => {
                                        return(
                                            <ul onClick={() => animateClip(index)} key={index}>
                                                <li>

                                                    <img src={pelis.poster_path ? `${urlImg}${pelis.poster_path}` : imgHolder } alt="Poster" />
                                                    <div className="clip" ><Link to={`/movies/${pelis.id}`} > More informatión </Link></div>
                                                    
                                                </li>

                                                <h6> {pelis.title} </h6>
                                            </ul>
                                        )
                                    })
                            }

                        </div>
                    </div>

                </section>    
                   
            </InfiniteScroll>
            
        </>
    );
}
 
export {HomeMovies};