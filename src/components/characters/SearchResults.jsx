import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from '../commons/card/Card';
import Spinner from '../commons/spinner/Spinner';
import Breadcrumbs from '../commons/breadcrumbs/Breadcrumbs';
import { isEmpty } from '../../utils';
import Helmet from 'react-helmet';


const SearchResults = ({ characters, errors, searchTerm, history }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [characters]);

    //* Check if there are gobal errors, if so redirect to Errors page 
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    let content = <Spinner />;

    if (!isLoading && characters !== undefined) {
        if (characters.length > 0) {
            content = characters.map(item => <Card key={item.id} data={item} />)
        } else {
            content = (
                <div className="my-5 py-5">
                    <h2 className="display-4 my-5 py-5">
                        No results found for "{searchTerm}"
                    </h2>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <Helmet>
                <title>Resutls for "{searchTerm}"</title>
            </Helmet>
            <div className="container">
                <Breadcrumbs elements={[{ path: '/', name: 'home' }, { path: '/characters', name: 'Characters' }]} current={searchTerm} />
            </div>
            <div className="container grid mb-4">
                {content}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    characters: state.marvel.searchResults,
    searchTerm: state.marvel.searchTerm,
    errors: state.errors
});

export default connect(mapStateToProps, {})(SearchResults);
