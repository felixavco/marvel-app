
import React, { useState, Fragment } from 'react';
import emptyImg from '../../../img/empty-image.png'

const Gallery = ({ images, isActive, setIsActive }) => {

    const [currentImg, setCurrentImg] = useState(0);
    const [total] = useState(images.length);

    const nextImg = () => {
        if (currentImg >= total - 1) {
            setCurrentImg(0)
        } else {
            setCurrentImg(currentImg + 1)
        }
    }

    const prevImg = () => {
        if (currentImg === 0) {
            setCurrentImg(total - 1)
        } else {
            setCurrentImg(currentImg - 1)
        }
    }

    let indicators = images.map((img, i) => (
        <li key={i} data-target="#postGallery" data-slide-to="0" className={i === currentImg ? 'active-img' : null} >
            <i className="far fa-dot-circle"></i>
        </li>
    ));

    let initialImage = (
        <Fragment>
            <img src={emptyImg} alt="Emtpy" />

            <ul id="indicators">
                <li>No images available</li>
            </ul>
        </Fragment>
    )

    if (images.length > 0) {
        initialImage = (
            <Fragment>
                <img
                    className="current-img"
                    src={images[currentImg].path + "." + images[currentImg].extension || emptyImg}
                    alt={`comic-gallery${currentImg}`}
                />

                <ul id="indicators">
                    {indicators}
                </ul>
            </Fragment>
        )
    }

    return (
        <div id="Gallery" className={isActive ? "Gallery-active" : null}>
            <div className="container">
                <div className="row mt-1">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <span onClick={prevImg}>
                            {images.length > 1 && <i id="btn-prev" className="fas fa-chevron-left" />}
                        </span>

                    </div>

                    <div className="col-10 text-center">
                        {initialImage}

                    </div>

                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <i onClick={() => setIsActive(false)} id="btn-close-gallery" className="far fa-times-circle" />
                        <span onClick={nextImg} >
                            {images.length > 1 && <i id="btn-next" className="fas fa-chevron-right" />}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Gallery;