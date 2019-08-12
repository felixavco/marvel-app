import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Helmet from 'react-helmet';
import List from '../commons/list/List';
//Redux
import { connect } from 'react-redux';
import { getSingleCharacter } from '../../redux/actions/marvelActions';
import { setFavorite, removeFavorite } from '../../redux/actions/layoutActions';

const SingleCharacter = ({ getSingleCharacter, character, match, setFavorite, removeFavorite, favorites }) => {

    useEffect(() => {
        getSingleCharacter(match.params.char_id);
    }, [match.params.char_id])

    let content = <Spinner />

    if (character) {
        const { id, name, thumbnail, description, comics, stories } = character;

        let favIcon;
        if (favorites.filter(fav => fav.id === id).length > 0) {
            favIcon = <i title="Remove from favorites" style={{cursor: 'pointer'}} onClick={() => removeFavorite(id)} className="fas fa-star"></i>
        } else {
            favIcon = <i title="Add to favorites" style={{cursor: 'pointer'}}  onClick={() => setFavorite({ name, id })} className="far fa-star"></i>
        }

        content = (
            <Fragment>
                <Helmet>
                    <title>{name}</title>
                </Helmet>
                <div id="singleCharacter" className="container my-4">
                    <div className="row">
                        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                            <img src={thumbnail.path + "/portrait_uncanny." + thumbnail.extension} alt={name} className="thumbnail rounded" />
                        </div>
                        <div className="col-12 col-md-8 d-flex align-items-center justify-content-center">
                            <div>
                                <div className="d-flex justify-content-end mr-4">
                                    <h2>
                                        {favIcon}
                                    </h2>
                                </div>
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

const mapStateToProps = (state) => ({
    character: state.marvel.singleCharacter,
    favorites: state.layout.favorites
});

export default connect(mapStateToProps, { getSingleCharacter, setFavorite, removeFavorite })(SingleCharacter)
