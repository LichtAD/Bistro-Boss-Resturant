import React from 'react';
import Banner from './Banner';
import Category from './Category';
import PopularMenu from './PopularMenu';
import Featured from './Featured';
import Testimonials from './Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Bistro Boss</title>
            </Helmet>
            {/* <h1>Home</h1> */}
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;