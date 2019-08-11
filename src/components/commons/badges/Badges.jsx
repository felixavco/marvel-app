import React from 'react';
import { Link } from 'react-router-dom';


const Badges = ({ items, url }) => {

    const content = items.map((item, i) => {
        const id = item.resourceURI.split('/')[6];
        return (
            <h4 key={i} className="d-inline mr-1">
                <Link
                    to={`/${url}/${id}`}
                    className={`badge badge-${url === 'character' ? "secondary" : "danger" }`}
                >
                    {item.name}
                </Link>
            </h4>
        )
    });

    return content;
}

export default Badges
