import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center my-5 py-5">
            <div className="my-5 py-5 h-75">
                <h1 className="display-2 text-center">404 Page not Found</h1>
                <h3 className="text-center">Please verify the URL and try again</h3>
                <hr />
                <div className="text-center">
                    <Link className="btn btn-outline-secondary" to="/">Go to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;