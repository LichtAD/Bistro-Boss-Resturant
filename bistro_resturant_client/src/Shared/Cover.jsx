import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, title, subTitle }) => {
    return (

        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[600px]">
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="w-[900px] h-[300px] bg-black bg-opacity-50 flex justify-center items-center flex-col">
                        <h1 className="mb-5 text-5xl font-bold uppercase text-white">{title}</h1>
                        <p className="mb-5 uppercase text-white text-center w-[700px]">
                            {subTitle}
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>


    );
};

export default Cover;