import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
import { isEmpty, removeDuplicates } from '../../utils';
import Breadcrumbs from '../commons/breadcrumbs/Breadcrumbs';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';
import { setCharFilter } from '../../redux/actions/layoutActions';

import InfiniteScroll from 'react-infinite-scroll-component';

const CharactersList = ({ getCharacters, setCharFilter, characters, errors, history, characterFilter }) => {

    const [list, setList] = useState([]);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);

    //* initial load and reset list when filter changes
    useEffect(() => {
        getCharacters(limit, offset, characterFilter);
    }, [characterFilter]);

    //* updates the list when characters is updated
    useEffect(() => {
        if (characters) {
            setList([...list, ...characters]);
        }
    }, [characters]);

    const fetchData = () => {
        setOffset(limit + offset);
        if (offset === 0) {
            getCharacters(limit, (offset + limit), characterFilter);
        } else {
            getCharacters(limit, offset, characterFilter);
        }
    }

    //* Reset list and offset before update charfilter
    const cleanAndUpdate = () => {
        setList([]);
        setOffset(0);
        setCharFilter(characterFilter)
    }

    let content = <Spinner />

    //* Check if there are gobal errors, if so redirect to Errors page
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    if (list && list.length > 0) {
        
        content = (
            <InfiniteScroll
                className="container grid mt-4 mb-5"
                dataLength={list.length}
                next={fetchData}
                hasMore={true}
                loader={<div className="my-"><Spinner fullHeigh={false} /></div>}
            >
                {removeDuplicates(list).map(item => <Card key={item.id} data={item} />)}
            </InfiniteScroll>
        );
    }

    return (

        <Fragment>
            <Helmet>
                <title>Characters</title>
            </Helmet>
            <div style={{ background: '#E9ECEF' }} className="container d-flex justify-content-between align-items-center">
                <Breadcrumbs elements={[{ path: '/', name: 'home' }]} current={'characters'} />
                <div>
                    <h5
                        onClick={cleanAndUpdate}
                        style={{ cursor: 'pointer' }}
                        className="text-center"
                    >
                        Filtered by name &nbsp;
                        {
                            characterFilter ?
                                <i className="fas fa-sort-alpha-down fa-lg" /> :
                                <i className="fas fa-sort-alpha-down-alt fa-lg" />
                        }
                    </h5>
                </div>
            </div>
            {content}
        </Fragment>

    );
}


const mapStateToProps = (state) => ({
    characterFilter: state.layout.characterFilter,
    characters: state.marvel.characters,
    errors: state.errors
});

export default connect(mapStateToProps, { getCharacters, setCharFilter })(CharactersList);