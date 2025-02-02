import React from 'react';
import "../styles/NavigationBar.css";

function Navbar() {


    return (
        <nav className="navbar">
            <div className="navbar-left">
                <p className="logo">Queer Map</p>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href="/event"><p className='logo'> create an event</p></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;