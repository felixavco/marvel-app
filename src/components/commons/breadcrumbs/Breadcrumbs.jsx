import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ elements, current }) => {

    const items = elements.map((el, i) => (
        <li key={i} className="breadcrumb-item"><Link to={el.path}>{el.name}</Link></li>
    ))

    return (
        <nav aria-label="breadcrumb">
            <ol style={{ marginBottom: '0' }} className="breadcrumb">
                {items}
                <li className="breadcrumb-item " aria-current="page">{current}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumbs
