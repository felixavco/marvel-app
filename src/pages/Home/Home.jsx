import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import Helmet from 'react-helmet';
import bg from '../../img/bg.jpg';
import mdBg from '../../img/md-bg.jpg';
import smBg from '../../img/sm-bg.jpg';

const Home = () => {
    return (
        <div id="home">
            <Helmet>
                <title>Marvel App</title>
            </Helmet>
            
            <ResponsiveImage className="bg" alt="Background banner">
                <ResponsiveImageSize
                    default
                    minWidth={0}
                    path={smBg}
                />
                <ResponsiveImageSize
                    minWidth={768}
                    path={mdBg}
                />
                <ResponsiveImageSize
                    minWidth={1200}
                    path={bg}
                />
            </ResponsiveImage>


            <div className="container">
                <div className="row mx-auto d-flex justify-content-center">
                    <Link to="/characters" className="col-12 col-md-3 card" >
                        Characters
                    </Link>

                    <Link to="/comics" className="col-12 col-md-3 card" >
                        Comics
                    </Link>

                    <Link to="/stories" className="col-12 col-md-3 card" >
                        Stories
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
