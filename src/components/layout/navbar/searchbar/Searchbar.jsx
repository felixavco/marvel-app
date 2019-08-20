import React, { useState } from 'react';

const Searchbar = () => {

    const [ value, setValue ] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(value);
    }

    return (
        <form onSubmit={(e) => submitHandler(e)} id="SearchBar" className="d-flex align-items-center">
            <input onChange={(e) => setValue(e.target.value)} type="text" name="" placeholder="Search Characters" />
            <button className="btn btn-danger" type="submit"><i className="fas fa-search"></i></button>
        </form>
    )
}

export default Searchbar
