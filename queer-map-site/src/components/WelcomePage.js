import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WelcomePage(){
    return (
        <div class = "title">
            <h1>Welcome to Queer-maps</h1>
            <p>
                Open home {' '}
                <Link to="/HomePage">
                    Here!
                </Link>
            </p>
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