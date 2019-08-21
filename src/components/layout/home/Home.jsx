import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../../../img/bg.jpg';
import mdBg from '../../../img/md-bg.jpg';
import smBg from '../../../img/sm-bg.jpg';

const Home = () => {
    return (
        <div id="home">

            <img id="bg" src={smBg} srcSet={`${smBg} 370w, ${mdBg} 768w, ${bg} 1280w`} alt="main background"/>

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
