import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';

const Main = () => {
    return (
        <div>
            <div className='min-h-screen max-w-screen-xl mx-auto'>
                <Navbar></Navbar>
                <div className='pt-20'>
                <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;