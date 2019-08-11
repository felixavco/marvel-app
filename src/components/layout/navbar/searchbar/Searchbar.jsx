import React from 'react';

const Searchbar = () => {
    return (
        <form id="SearchBar" className="d-flex align-items-center">
            <input type="text" name="" placeholder="Search Characters" />
            <button className="btn btn-danger" type="submit"><i className="fas fa-search"></i></button>
        </form>
    )
}

export default Searchbar
