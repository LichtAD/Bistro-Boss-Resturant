import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';
import { ToastContainer } from 'react-toastify';

const Main = () => {

    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('registration');

    return (
        <div>
            <div className='min-h-screen max-w-screen-xl mx-auto'>
                {noHeaderFooter || <Navbar></Navbar>}
                <div className={noHeaderFooter ? '' : 'pt-20'}>
                    <Outlet></Outlet>
                </div>
                {noHeaderFooter || <Footer></Footer>}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Main;