import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';
const Card = ({ data }) => (

    <div className="Card row">
        <div className="col-12 col-md-4 d-flex justify-content-end align-items-center">
            <Link to={`/character/${data.id}`}>
                <img
                    className="rounded thumnail"
                    src={data.thumbnail.path + '/portrait_fantastic.' + data.thumbnail.extension}
                    alt={data.name}
                />
            </Link>
        </div>
        <div className="col-12 col-md-8 d-flex justify-content-start align-items-center">
            <div>
                <Link to={`/character/${data.id}`}><h2>{data.name}</h2></Link>
                <p className="lead">{data.description.length > 0 ? data.description : "No description available..."}</p>
            </div>
        </div>
    </div>

)

export default Card
