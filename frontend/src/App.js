import React from 'react';
import './static/css/index.css'
import './static/css/background.css'
import UserCard from './cards/UserCard';
import FilterCard from './cards/FilterCard';
//import Background from './cards/Background';
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function App() {
    let { user } = useContext(AuthContext);
    //console.log(user);
    
    return ( 
        <div className='container bg-container'>
            {
                //<Background />
            }       
            <UserCard user={user}/>
            <FilterCard user={user}/>
        </div>
    )
    
}
