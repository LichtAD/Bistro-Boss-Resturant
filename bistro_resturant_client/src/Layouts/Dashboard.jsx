import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaCartShopping, FaRegMessage, FaShop, FaTableList } from 'react-icons/fa6';
import { FaAd, FaCalendar, FaHistory, FaHome, FaList } from 'react-icons/fa';
import UseCart from '../Hooks/UseCart';
import UseAdmin from '../Hooks/UseAdmin';

const Dashboard = () => {

    // ! get isAdmin value from database, check if user is admin
    // const isAdmin = true;
    const [isAdmin] = UseAdmin();

    const [cart] = UseCart();

    return (
        <div className='flex'>

            {/* sidebar */}
            <div className='w-64 min-h-screen bg-orange-400'>
                <h1 className='text-3xl font-bold text-center mt-5'>BISTRO BOSS</h1>
                <h2 className='text-3xl font-bold text-center my-2'>Restaurant</h2>

                {
                    isAdmin ? <ul className="menu">
                        <li><NavLink to='/dashboard/adminHome'><FaHome />Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/addItems'><FaCalendar />Add Items</NavLink></li>
                        <li><NavLink to='/dashboard/manageItems'><FaHistory />manage items</NavLink></li>
                        {/* <li><NavLink to='/dashboard/cart'><FaCartShopping />Admin Cart ({cart?.length || 0})</NavLink></li> */}
                        <li><NavLink to='/dashboard/addReview'><FaAd />Manage Bookings</NavLink></li>
                        <li><NavLink to='/dashboard/allUsers'><FaList />All Users</NavLink></li>
                    </ul>
                        : <ul className="menu">
                            <li><NavLink to='/dashboard/userHome'><FaHome />User Home</NavLink></li>
                            <li><NavLink to='/dashboard/payment'><FaCalendar />Reservation</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaHistory />Payment History</NavLink></li>
                            <li><NavLink to='/dashboard/cart'><FaCartShopping />User Cart ({cart?.length || 0})</NavLink></li>
                            <li><NavLink to='/dashboard/addReview'><FaAd />Add Review</NavLink></li>
                            <li><NavLink to='/dashboard/myBooking'><FaList />My Booking</NavLink></li>
                        </ul>
                }

                {/* shared navlinks */}
                <hr className='my-5' />
                <ul className="menu">
                    <li><NavLink to='/'><FaHome />Home</NavLink></li>
                    <li><NavLink to='/'><FaTableList />Menu</NavLink></li>
                    <li><NavLink to='/'><FaShop />Shop</NavLink></li>
                    <li><NavLink to='/'><FaRegMessage />Contact</NavLink></li>
                </ul>
            </div>

            {/* content */}
            <div className='flex-1 p-10'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;