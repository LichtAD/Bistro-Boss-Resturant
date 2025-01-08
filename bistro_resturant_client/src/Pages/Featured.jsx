import React from 'react';
import SectionTitle from '../components/SectionTitle';

const Featured = () => {
    return (
        <div className="mb-20 bg-[url('./assets/home/featured.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50 text-white pt-10 bg-fixed">
            <SectionTitle heading='FROM OUR MENU' subHeading='---Check it out---'></SectionTitle>
            <div className='md:flex gap-10 justify-center items-center px-36 pb-20 pt-12'>
                <div>
                    <img src="./assets/home/featured.jpg" alt="" />
                </div>
                <div>
                    <p>March 20, 2023</p>
                    <h1>WHERE CAN I GET SOME?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className='btn btn-outline bg-transparent text-white hover:bg-btn_dark hover:text-btn_gold border-0 border-b-4 mt-4'>Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;