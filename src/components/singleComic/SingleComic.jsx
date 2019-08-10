import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../commons/Spinner';
import Helmet from 'react-helmet';
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
        const { title, thumbnail, description, prices, creators } = comic;
        console.log(comic)
        content = (
            <Fragment>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div id="singleComic" className="container">
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                            <img src={thumbnail.path + "/portrait_uncanny." + thumbnail.extension} alt={title} className="thumbnail rounded" />
                        </div>
                        <div className="col-12 col-md-9">
                            <h1 className="text-center display-4">{title}</h1>
                            {/* <hr /> */}
                            <div className="px-3">
                                <h4><strong>Prices:</strong></h4>
                                {prices[0] && prices[0] > 0 ? (<h4>Print: ${prices[0].price}</h4>) : (<h4>Print: Not avaible</h4>)}
                                {prices[1] ? (<h4>Digital: ${prices[1].price}</h4>) : (<h4>Digital: Not available</h4>)}
                                <br />
                                <h4><strong>Description:</strong></h4>
                                <p className="lead">{description ? description : "No description available..."}</p>
                                <hr />
                                <h4><strong>Creators</strong></h4>
                                {creators.items.map((item, i) => (
                                    <span key={i} className="badge badge-pill badge-light mr-1">
                                        {`${item.name} (${item.role})`}
                                    </span>
                                ))}
                            </div>
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

