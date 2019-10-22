import React from 'react';
import { NavLink } from 'react-router-dom';
import Favorites from './favorites/Favorites';
//*Redux
import { connect } from 'react-redux';
import { toggleMenu, toggleSubMenu } from '../../../redux/actions/layoutActions';



const Sidebar = ({ isMenuActive, toggleMenu, isSubMenuActive, toggleSubMenu }) => {

    return (
        <nav id="Sidebar" className={isMenuActive ? "side-nav-active" : null}>
            <ul className="sidebar-ul">
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/">Home</NavLink></li>
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/characters">Characters</NavLink></li>
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/comics">Comics</NavLink></li>
                <li><NavLink onClick={() => toggleMenu(isMenuActive)} exact={true} to="/stories">Stories</NavLink></li>
                <li className="bookmarks" onClick={() => toggleSubMenu(isSubMenuActive)}>Favorites</li>
            </ul>
            <Favorites/>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isMenuActive: state.layout.isMenuActive,
    isSubMenuActive: state.layout.isSubMenuActive
});

export default connect(mapStateToProps, { toggleMenu, toggleSubMenu })(Sidebar)
