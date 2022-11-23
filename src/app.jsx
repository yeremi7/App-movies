import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { HomeMovies } from "./componentes/HomeMovies";
import { MovieInfo } from "./componentes/MovieInfo";


const App = () => { 

    return(
        <BrowserRouter>
                <Routes>
                    <Route  path='/'  element={<HomeMovies />} />
                    <Route  path='/movies/:id'  element={<MovieInfo />} />
                </Routes>
          
        </BrowserRouter>
    )
}
export  {App};