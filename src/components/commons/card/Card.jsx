import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss';

const Card = ({ data }) => (

    <Link to={`/character/${data.id}`}>
        <div className="outter-card">
            <div className="inner-card rounded">
                <img
                    className="rounded thumnail"
                    src={data.thumbnail.path + '/portrait_uncanny.' + data.thumbnail.extension}
                    alt={data.name}
                />
                <h4>{data.name}</h4>
            </div>
        </div>
    </Link>

)

export default Card
