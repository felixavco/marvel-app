import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className="container row">
                <div className="col-12 col-md-4">
                    <Link to="/characters" ><h2>Characters</h2></Link>
                </div>
                <div className="col-12 col-md-4">
                    <Link to="/comics" ><h2>Comics</h2></Link>
                </div>
                <div className="col-12 col-md-4">
                    <Link to="/stories" ><h2>Comics</h2></Link>
                </div>
            </div>
        </div>
    )
}

export default Home
