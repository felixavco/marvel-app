
import React from 'react';
import emtpyImage from '../../../img/empty-image.png';

const Gallery = ({ images }) => {
    let indicators = images.map((image, i) => (
        <li key={i} data-target="#postGallery" data-slide-to="0" className={i === 0 ? 'active' : null} />
    ));

    let gallery_Images;

    if (images.length > 0) {
        gallery_Images = images.map((image, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : null}`}>
                <img src={image.path + "." + image.extension} alt={image} />
            </div>
        ));
    } else {
        gallery_Images = (
            <div className="carousel-item active">
                <img src={emtpyImage} alt="Empty" />
            </div>
        );
    }

    return (
        <div id="Gallery">
            <div id="postGallery" className="Gallery slide mb-3" data-ride="carousel">
                <ol className="carousel-indicators">{indicators}</ol>

                <div className="carousel-inner">{gallery_Images}</div>

                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};

export default Gallery;