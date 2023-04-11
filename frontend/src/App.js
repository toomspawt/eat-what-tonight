import React from 'react';
import './static/css/index.css'
import UserCard from './cards/UserCard';
import FilterCard from './cards/FilterCard';
import RegisterCard from './cards/RegisterCard';
import { useContext } from "react";
import AuthContext from "./context/AuthContext";


export default function App() {
    let { user } = useContext(AuthContext);
    //console.log(user);
    
    return ( 
        <div className='card-container'>
            { !user && <RegisterCard />}
            <UserCard user={user}/>
            <FilterCard user={user}/>
        </div>
    )
    
}
