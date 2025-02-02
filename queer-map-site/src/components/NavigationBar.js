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
                        <p>1</p>
                    </li>
                    <li>
                       <p>2</p>
                    </li>
                    <li>
                        <p>3</p>
                    </li>
                    <li>
                        <p>4</p>
                    </li>
                    <li>
                        <p>5</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;