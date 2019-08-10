import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ items, url }) => {

    const list = items.map((item, i) => {
        const id = item.resourceURI.split('/')[6];
        return (
            <Link key={i} to={`${url}/${id}`}>
                <li className="list-group-item text-center text-primary">
                    {item.name}
                </li>
            </Link>
        )
    })
    return <ul className="list-group">{list}</ul>
}

export default List



