import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../../components/commons/spinner/Spinner';
import Card from '../../components/commons/card/Card';
import { isEmpty, removeDuplicates } from '../../utils';
import Helmet from 'react-helmet';
//Redux
import { connect } from 'react-redux';
import { getComics } from '../../redux/actions/marvelActions';
import { setComicFilter } from '../../redux/actions/layoutActions';
import Breadcrumbs from '../../components/commons/breadcrumbs/Breadcrumbs';

import './comicsList.scss'

import InfiniteScroll from 'react-infinite-scroll-component';


const ComicsList = ({ comics, errors, getComics, history, formatType, displayBy, orderBy, setComicFilter }) => {

    const [list, setList] = useState([]);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [stateFormatType, setFormatType] = useState(formatType);
    const [stateDisplayBy, setDisplayBy] = useState(displayBy);
    const [stateOrderBy, setOrderBy] = useState(orderBy);

    //* Load initial comics & refetch new comics when select input changes its value
    useEffect(() => {
        getComics(limit, offset, formatType, displayBy, stateOrderBy);
    }, [formatType, displayBy, orderBy]);


    //* if the select input changes reset the offset and the list to fetch new comics
    useEffect(() => {
        cleanAndUpdate();
    }, [stateFormatType, stateDisplayBy, stateOrderBy])

    //* When Comics is updated set the comicts to the list
    useEffect(() => {
        if (comics) {
            setList([...list, ...comics]);
        }
    }, [comics]);


    const fetchData = () => {
        setOffset(limit + offset);
        if (offset === 0) {
            getComics(limit, (offset + limit), formatType, displayBy, stateOrderBy);
        } else {
            getComics(limit, offset, formatType, displayBy, stateOrderBy);
        }
    }

    const cleanAndUpdate = () => {
        setList([]);
        setOffset(0);
        setComicFilter(stateFormatType, stateDisplayBy, stateOrderBy)
    }

    //* Check if there are gobal errors, if so redirect to Errors page
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    let content = <Spinner />;

    if (list && list.length > 0) {

        content = (
            <InfiniteScroll
                className="container grid mt-4 mb-5"
                dataLength={list.length}
                next={fetchData}
                hasMore={true}
                loader={<div className="my-"><Spinner fullHeigh={false} /></div>}
            >
                {removeDuplicates(list).map((item, i) => <Card key={i} data={item} url='comic' />)}
            </InfiniteScroll>
        )

    }

    const titleFilter = (
        <span style={{cursor: "pointer"}} onClick={() => setOrderBy(!stateOrderBy)}>
            {stateOrderBy ? <i className="fas fa-sort-alpha-down fa-lg" /> : <i className="fas fa-sort-alpha-up-alt fa-lg" />}
        </span>
    )

    const numberFilter = (
        <span style={{cursor: "pointer"}} onClick={() => setOrderBy(!stateOrderBy)}>
            {stateOrderBy ? <i className="fas fa-sort-numeric-down fa-lg" /> : <i className="fas fa-sort-numeric-down-alt fa-lg" />}
        </span>
    )


    return (
        <Fragment>
            <Helmet>
                <title>Comics</title>
            </Helmet>
            <div id="comics" style={{ background: '#E9ECEF' }} className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <Breadcrumbs elements={[{ path: '/', name: 'Home' }]} current={'Comics'} />
                    </div>

                    <form className="col-12 col-md-6 col-lg-8 d-flex justify-content-end align-items-center">
                        <div className="mr-1">
                            <label style={{ margin: '0' }} htmlFor="formatType">Format Type</label>
                            <select style={{ cursor: "pointer" }} onChange={(e) => setFormatType(e.target.value)} id="formatType" className="ml-2">
                                <option value="comic">Comic</option>
                                <option value="collection">Collection</option>
                            </select>
                        </div>

                        <div className="ml-1 mr-1">
                            <label style={{ margin: '0' }} htmlFor="displayBy">Display by</label>
                            <select style={{ cursor: "pointer" }} onChange={(e) => setDisplayBy(e.target.value)} id="displayBy" className="ml-2">
                                <option value="title">Title</option>
                                <option value="issueNumber">Issue Number</option>
                            </select>
                        </div>
                        <div className="ml-2" style={{ cursor: "pointer" }}>
                            { displayBy === "title" ? titleFilter : numberFilter }
                        </div>
                    </form>
                </div>
            </div>

            {content}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    comics: state.marvel.comics,
    formatType: state.layout.formatType,
    displayBy: state.layout.displayBy,
    orderBy: state.layout.orderBy,
    errors: state.errors
});

export default connect(mapStateToProps, { getComics, setComicFilter })(ComicsList);

