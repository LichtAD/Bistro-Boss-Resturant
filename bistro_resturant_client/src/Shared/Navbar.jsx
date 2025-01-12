import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import UseAuth from '../Hooks/UseAuth';
import UseCart from '../Hooks/UseCart';

const Navbar = () => {

    // data ta load hcche, array ta astese
    const [cart] = UseCart();

    const { user, logOut } = UseAuth();

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Menu</NavLink></li>
        <li><NavLink to='/order/salad'>Order</NavLink></li>
        <li><NavLink to='/secret'>Secret</NavLink></li>
        {
            user && <li><NavLink to='/dashboard/cart'>
                <IoCartSharp size={20} />
                <div className="badge badge-secondary">+{cart?.length || 0}</div>
            </NavLink></li>
        }
        {/* <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li> */}
    </>

    return (
        <div className="navbar bg-black max-w-screen-xl mx-auto bg-opacity-10 backdrop-blur-md fixed z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <NavLink to='/' className="ml-2 btn btn-ghost text-xl">BISTRO BOSS Restaurant</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end space-x-4">
                <div>
                    {
                        user && user?.photoURL ?
                            <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName}>
                                <div className="w-12 rounded-full ring ring-black/30">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            : ''
                    }
                </div>
                <div>
                    {
                        user && user?.email ?
                            <button onClick={logOut} className="btn bg-white border-none">Log-Out</button>
                            : <NavLink to="/login" className="btn bg-white border-none">Login Now</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;