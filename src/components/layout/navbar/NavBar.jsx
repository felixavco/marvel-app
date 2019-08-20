import React from 'react';
import MenuIcon from './menuIcon/MenuIcon';
import Logo from '../../../img/Marvel-Logo.png'
import Searchbar from './searchbar/Searchbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header id="navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-between aling-items-center">
                    <MenuIcon />

                    <div className="logo d-none d-md-block">
                        <Link to="/">
                            <img src={Logo} alt="Marvel Logo" />
                        </Link>
                    </div>

                    <Searchbar />
                </div>
            </nav>
        </header>
    )
}

export default NavBar
