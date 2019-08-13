import React from 'react'

const Breadcrumbs = ({elements, current}) => {

    const items = elements.map((el, i) => (
        <li class="breadcrumb-item"><a href={el.path}>{ el.name }</a></li>
    ))

    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                { items }
                <li class="breadcrumb-item " aria-current="page">{current}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumbs
