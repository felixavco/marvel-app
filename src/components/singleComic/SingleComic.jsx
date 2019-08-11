import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/spinner/Spinner';
import Helmet from 'react-helmet';
import Badges from '../commons/badges/Badges';

//Redux
import { connect } from 'react-redux';
import { getSingleComic } from '../../redux/actions/marvelActions';


const SingleComic = ({ comic, getSingleComic, match }) => {
    const [id] = useState(match.params.comic_id);

    useEffect(() => {
        getSingleComic(id);
    }, [])

    let content = <Spinner />

    if (comic) {
        const { title, thumbnail, description, prices, stories, characters } = comic;
        content = (
            <Fragment>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div id="singleComic" className="container my-4">
                    <h1 className="text-center display-4">{title}</h1>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                            <img src={thumbnail.path + "/portrait_uncanny." + thumbnail.extension} alt={title} className="thumbnail rounded" />
                        </div>
                        <div className="col-12 col-md-9 px-4 mt-3">
                            <h5><strong>Prices:</strong></h5>
                            {prices[0] && prices[0] > 0 ?
                                (<h4>Print: <span className="text-success">${prices[0].price}</span></h4>) :
                                (<h4>Print: <span className="text-danger">Not available</span></h4>)
                            }
                            {prices[1] ?
                                (<h4>Digital: <span className="text-success">${prices[1].price}</span></h4>) :
                                (<h4>Digital: <span className="text-danger">Not available</span></h4>)
                            }
                            <br />
                            <h5><strong>Description:</strong></h5>
                            <p className="lead">{description ? description : "No description available..."}</p>

                            <h5><strong>Characters</strong></h5>
                            <Badges items={characters.items} url='character' />
                            <hr />
                            <h5><strong>Stories</strong></h5>
                            <Badges items={stories.items} url='story' />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    return content
}

const mapStateToProps = (state) => ({
    comic: state.marvel.singleComic
});

export default connect(mapStateToProps, { getSingleComic })(SingleComic);

