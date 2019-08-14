import React from 'react';

import { connect } from 'react-redux';
import { toggleMenu } from '../../../../redux/actions/layoutActions';

function MenuIcon({ toggleMenu, isMenuActive }) {

    return (
        <div
            id="menuIcon"
            className={isMenuActive ? "change" : null} //* "change" class styles on ./menuIcon.scss
            onClick={() => toggleMenu(isMenuActive)} //* Sends new menu state to redux store
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isMenuActive: state.layout.isMenuActive
});

export default connect(mapStateToProps, { toggleMenu })(MenuIcon)
