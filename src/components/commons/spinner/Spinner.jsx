import React from 'react'

const Spinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

export default Spinner
