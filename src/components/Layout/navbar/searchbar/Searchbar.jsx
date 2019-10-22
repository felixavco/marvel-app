import React, { useState } from 'react';
import { onSearch } from '../../../../redux/actions/marvelActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Searchbar = ({ onSearch, history }) => {

    let timer;
    const [delay] = useState(500);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('')

    const onKeyUp = () => {

        //* Change the button Icon to a loder icon
        setIsLoading(true);

        clearTimeout(timer);

        timer = setTimeout(async () => {
            if (value.trim().length > 0) {
                await onSearch(value.trim());
                //* Once the request is completed route to search results page
                history.push('/search-results');

                //* Switch the button icon to a regular icon after the request is completed
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }

        }, delay);
    };

    const onKeyDown = () => {
        clearTimeout(timer);
    };

    let buttonIcon;
    if (isLoading) {
        buttonIcon = <i className="fas fa-spinner fa-pulse"></i>
    } else {
        buttonIcon = <i className="fas fa-search"></i>;
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} id="SearchBar" className="d-flex align-items-center">
            <label className="d-none" htmlFor="inputSearch">Input Search</label>
            <input 
                id="inputSearch"
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                onKeyDown={onKeyDown} 
                onKeyUp={onKeyUp} 
                type="text" 
                placeholder="Search Characters" 
            />
            <button className="btn btn-danger" name="Search bar button" type="submit">{buttonIcon}</button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default withRouter(connect(mapStateToProps, { onSearch })(Searchbar));
