import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/Spinner';
import Helmet from 'react-helmet';
import List from '../commons/list/List';
//Redux
import { connect } from 'react-redux';
import { getSingleCharacter } from '../../redux/actions/marvelActions';

const SingleCharacter = ({ getSingleCharacter, character, match }) => {

    const [id] = useState(match.params.char_id);

    useEffect(() => {
        getSingleCharacter(id);
    }, [])

    let content = <Spinner />

    if (character) {
        const { name, thumbnail, description, comics, stories } = character;

        content = (
            <Fragment>
                <Helmet>
                    <title>{name}</title>
                </Helmet>
                <div id="singleCharacter" className="container">
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
                    <hr/>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h3 className="text-center font-weight-bold">Comics</h3>
                            <List items={comics.items} url="/comic" />
                        </div>
                        <div className="col-12 col-md-6">
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
    character: state.marvel.singleCharacter
});

export default connect(mapStateToProps, { getSingleCharacter })(SingleCharacter)
