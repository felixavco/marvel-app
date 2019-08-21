import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Card from '../commons/card/Card';
import { isEmpty } from '../../utils';
import Breadcrumbs from '../commons/breadcrumbs/Breadcrumbs';
//Redux
import { connect } from 'react-redux';
import { getCharacters } from '../../redux/actions/marvelActions';
import { setCharFilter } from '../../redux/actions/layoutActions';

import InfiniteScroll from 'react-infinite-scroll-component';

const CharactersList = ({ getCharacters, setCharFilter, characters, errors, history, characterFilter }) => {

    const [list, setList] = useState([]);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);

    //* Component Did Mount
    useEffect(() => {
        setList([]);
        setOffset(0);
        getCharacters(limit, offset, characterFilter);
    }, [characterFilter]);

    //* Component Did Update
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

    let content = <Spinner />

    //* Check if there are gobal errors, if so redirect to Errors page
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    if (list && list.length > 0) {
        //* Removing duplicate objects from list
        const seen = new Set();
        const filteredList = list.filter(el => {
            const duplicate = seen.has(el.id);
            seen.add(el.id);
            return !duplicate;
        });

        content = (
            <InfiniteScroll
                className="container grid mt-4 mb-5"
                dataLength={list.length}
                next={fetchData}
                hasMore={true}
                loader={<div className="my-"><Spinner fullHeigh={false} /></div>}
            >
                {filteredList.map(item => <Card key={item.id} data={item} />)}
            </InfiniteScroll>
        );
    }

    return (

         <Fragment>
                <div style={{ background: '#E9ECEF' }} className="container d-flex justify-content-between align-items-center">
                    <Breadcrumbs elements={[{ path: '/', name: 'home' }]} current={'characters'} />
                    <div>
                        <h5
                            onClick={() => setCharFilter(characterFilter)}
                            style={{ cursor: 'pointer' }}
                            className="text-center"
                        >
                            Filtered by name
                            {characterFilter ? <i className="fas fa-sort-alpha-down"></i> : <i className="fas fa-sort-alpha-down-alt"></i>}
                        </h5>
                    </div>
                </div>
                { content }
            </Fragment>

    );
}


const mapStateToProps = (state) => ({
    characterFilter: state.layout.characterFilter,
    characters: state.marvel.characters,
    errors: state.errors
});

export default connect(mapStateToProps, { getCharacters, setCharFilter })(CharactersList);