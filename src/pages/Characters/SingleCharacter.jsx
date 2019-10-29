import React, { useEffect, Fragment, useState } from 'react';
import Spinner from '../../components/commons/spinner/Spinner';
import Helmet from 'react-helmet';
import List from '../../components/commons/list/List';
import Breadcrumbs from '../../components/commons/breadcrumbs/Breadcrumbs';
import { isEmpty } from '../../utils';
//Redux
import { useSelector } from 'react-redux';
import { charactersActions } from '../../redux/actions/marvelActions';
import { layoutActions } from '../../redux/actions/layoutActions';

const SingleCharacter = ({ match, history  }) => {

    const [showText, setShowText] = useState(false);
    const character = useSelector(state => state.marvel.singleCharacter);
    const favorites = useSelector(state => state.layout.favorites);
    const errors = useSelector(state => state.errors);

    useEffect(() => {
        charactersActions.getOne(match.params.char_id);
    }, [match.params.char_id])

    let content = <Spinner />

    //* Check if there are gobal errors, if so redirect to Errors page 
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    if (character) {
        const { id, name, thumbnail, description, comics, stories } = character;

        let favIcon;
        if (favorites.filter(fav => fav.id === id).length > 0) {
            favIcon = (
                <span
                    onMouseEnter={() => setShowText(true)}
                    onMouseLeave={() => setShowText(false)}
                    style={{ cursor: 'pointer' }}
                    onClick={() => layoutActions.removeFavorite(id)}
                >
                    {showText ? 'Remove from Favorites' : null}&nbsp;<i title="Remove from favorites" className="fas fa-star fa-2x"></i>
                </span>
            )
        } else {
            favIcon = (
                <span
                    onMouseEnter={() => setShowText(true)}
                    onMouseLeave={() => setShowText(false)}
                    style={{ cursor: 'pointer' }}
                    onClick={() => layoutActions.setFavorite({ name, id })}
                >
                    {showText ? 'Add to Favorites' : null}&nbsp;<i className="far fa-star fa-2x"></i>
                </span>
            )
        }

        content = (
            <Fragment>
                <Helmet>
                    <title>{name}</title>
                </Helmet>

                <div id="singleCharacter" className="container mb-4">
                    <Breadcrumbs elements={[{ path: '/', name: 'home' }, { path: '/characters', name: 'Characters' }]} current={name} />
                    <div className="d-flex justify-content-end mr-4">
                        {favIcon}
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                            <img src={thumbnail.path + "/portrait_uncanny." + thumbnail.extension} alt={name} className="thumbnail rounded" />
                        </div>
                        <div className="col-12 col-md-8 d-flex align-items-center justify-content-center">
                            <div>
                                <h4 className="display-4 text-center">{name}</h4>
                                <p className="lead">{description.length > 0 ? description : "No description available..."}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-md-6 px-5">
                            <h3 className="text-center font-weight-bold">Comics</h3>
                            <List items={comics.items} url="/comic" />
                        </div>
                        <div className="col-12 col-md-6 px-5">
                            <h3 className="text-center font-weight-bold">Stories</h3>
                            <List items={stories.items} url="/story" />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    return content;
}


export default SingleCharacter;
