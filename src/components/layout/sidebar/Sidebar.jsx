import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//*Redux
import { connect } from 'react-redux';
import { toggleMenu } from '../../../redux/actions/layoutActions';



const Sidebar = ({ isMenuActive, toggleMenu }) => {

    return (
        <nav id="Sidebar" className={isMenuActive ? "side-nav-active" : null}>
            <ul className="sidebar-ul">
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/">Characters</NavLink></li>
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/comics">Comics</NavLink></li>
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/stories">Stories</NavLink></li>
                <li className="bookmarks">Favorites</li>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isMenuActive: state.layout.isMenuActive
});

export default connect(mapStateToProps, { toggleMenu })(Sidebar)
