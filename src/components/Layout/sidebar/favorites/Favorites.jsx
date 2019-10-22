import React from 'react';
import { Link } from 'react-router-dom';
//*Redux
import { connect } from 'react-redux';
import { toggleMenu, toggleSubMenu } from '../../../../redux/actions/layoutActions';



const Favorites = ({ isMenuActive, isSubMenuActive, favoritesArr, toggleMenu }) => {

      const closeMenus = () => {
            toggleMenu(isMenuActive);
            toggleSubMenu(isSubMenuActive);
        }

    let content = <h6>No Favorites</h6>;
    let items

    if(favoritesArr && favoritesArr.length > 0) {
        items = favoritesArr.map(({id, name})=> (
            <Link key={id} to={`/character/${id}`} onClick={() => closeMenus()} >
                <li className="bookmarks">
                    {name.length > 15 ? name.substring(0,15) + '...' : name}
                </li>
            </Link>
        ));
    }

    content = (
        <ul id="Favorites" className={isSubMenuActive ? 'favorites-active' : null}>
            { items }
        </ul>
    )

    return content;
}

const mapStateToProps = (state) => ({
    isMenuActive: state.layout.isMenuActive,
    isSubMenuActive: state.layout.isSubMenuActive,
    favoritesArr: state.layout.favorites
});

export default connect(mapStateToProps, { toggleMenu, toggleSubMenu })(Favorites)
