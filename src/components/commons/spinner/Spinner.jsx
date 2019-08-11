import React from 'react'

const Spinner = ({fullHeigh = true}) => (
    <div className="d-flex justify-content-center align-items-center" style={{ height:  fullHeigh ? '75vh' : null }}>
        <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

export default Spinner
