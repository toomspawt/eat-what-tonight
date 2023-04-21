import React from 'react';
import './static/css/index.css'
//import './static/css/background.css'
//import Background from './cards/Background';
import FilterCard from './cards/FilterCard';
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Navigation from './cards/Navbar';

export default function App() {
    let { user } = useContext(AuthContext);
    //console.log(user);
    
    return ( 
        <div>
            <Navigation user={user} />
            <div className='container bg-container'>
                {
                    //  <Background />
                }       
                <FilterCard user={user}/>
            </div>
        </div>
    )
    
}
