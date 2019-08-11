import React from 'react';
import { Link } from 'react-router-dom';
import './list.scss';

const List = ({ items, url }) => {

    const list = items.map((item, i) => {
        const id = item.resourceURI.split('/')[6];
        return (
            <Link key={i} to={`${url}/${id}`}>
                <li className="text-center text-primary">
                    {item.name}
                </li>
            </Link>
        )
    })
    return <ul id="List" className="mx-auto">{list}</ul>
}

export default List



