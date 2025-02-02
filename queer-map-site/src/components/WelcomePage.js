import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../map.png';


import '../styles/WelcomePage.css';

function WelcomePage(){

    const navigate = useNavigate();

    return (

        
        <div className="welcome-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h1>Welcome to Queer-Map</h1>
            <button className="welcome-button" onClick={() => navigate('/HomePage')}>
                Enter Home
            </button>
        </div>

    );
}

export default WelcomePage;