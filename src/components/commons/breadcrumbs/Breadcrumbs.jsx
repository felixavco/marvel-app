import React from 'react'

const Breadcrumbs = ({elements, current}) => {

    const items = elements.map((el, i) => (
        <li key={i} className="breadcrumb-item"><a href={el.path}>{ el.name }</a></li>
    ))

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                { items }
                <li className="breadcrumb-item " aria-current="page">{current}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumbs
