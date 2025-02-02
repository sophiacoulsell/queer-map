import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../styles/WelcomePage.css';

function WelcomePage(){

    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <h1>Welcome to Queer-Map</h1>
            <button className="welcome-button" onClick={() => navigate('/HomePage')}>
                Enter Home
            </button>
            <p>
            Open Event {' '}
                <Link to="/Event">
                    Here!
                </Link>
            </p>
        </div>

    );
}

export default WelcomePage;