import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../../components/commons/spinner/Spinner';
import Helmet from 'react-helmet';
import Badges from '../../components/commons/badges/Badges';
import { isEmpty } from '../../utils';

//Redux
import { connect } from 'react-redux';
import { getSingleStory } from '../../redux/actions/marvelActions';


const SingleStory = ({ story, getSingleStory, match, errors, history }) => {
    const [id] = useState(match.params.story_id);

    useEffect(() => {
        getSingleStory(id);
    }, [match.params.story_id]);

    let content = <Spinner />

    //* Check if there are gobal errors, if so redirect to Errors page 
    if (!isEmpty(errors)) {
        history.push('/error-page');
    }

    if (story) {
        const { title, description, creators, characters, comics } = story;

        content = (
            <Fragment>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div id="singleStory" className="container my-4">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">{title}</h1>
                        <p className="lead">{description.length > 0 ? description : "No description available..."}</p>

                        <h5><strong>Comics</strong></h5>
                        <Badges items={comics.items} url='comic' />

                        <hr className="my-4" />

                        <h5><strong>Characters</strong></h5>
                        <Badges items={characters.items} url='character' />

                        <hr className="my-4" />

                        <h5><strong>Creators</strong></h5>
                        {creators.items.map((item, i) => (
                            <span key={i} className="badge badge-pill badge-light mr-1">
                                {`${item.name} (${item.role})`}
                            </span>
                        ))}
                    </div>
                </div>
            </Fragment>
        )
    }

    return content
}

const mapStateToProps = (state) => ({
    story: state.marvel.singleStory, 
    errors: state.errors
});

export default connect(mapStateToProps, { getSingleStory })(SingleStory);

