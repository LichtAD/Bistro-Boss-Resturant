import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover';
import UseMenu from '../../Hooks/UseMenu';
import SectionTitle from '../../components/SectionTitle';
import MenuCategory from './MenuCategory';
import { NavLink } from 'react-router-dom';

const Menu = () => {

    const [menu] = UseMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');

    return (
        <div className='mb-10'>
            <Helmet>
                <title>Menu | Bistro Boss</title>
            </Helmet>

            {/* popular menu */}
            <Cover img='./assets/menu/banner3.jpg' title='OUR MENU' subTitle='Would you like to try a dish?'></Cover>
            <SectionTitle heading="TODAY'S OFFER" subHeading="---Don't miss---"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <div className='flex justify-center'>
                <NavLink to={`/order`} className='btn btn-outline border-0 border-b-4 mb-10'>ORDER YOUR FAVOURITE FOOD</NavLink>
            </div>

            {/* DESSERTS */}
            <Cover img='./assets/menu/dessert-bg.jpeg' title='DESSERTS' subTitle='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></Cover>
            <MenuCategory items={dessert}></MenuCategory>
            <div className='flex justify-center'>
                <NavLink to={`/order/dessert`} className='btn btn-outline border-0 border-b-4 mb-10'>ORDER YOUR FAVOURITE FOOD</NavLink>
            </div>

            {/* PIZZA */}
            <Cover img='./assets/menu/pizza-bg.jpg' title='PIZZA' subTitle='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></Cover>
            <MenuCategory items={pizza}></MenuCategory>
            <div className='flex justify-center'>
                <NavLink to={`/order/pizza`} className='btn btn-outline border-0 border-b-4 mb-10'>ORDER YOUR FAVOURITE FOOD</NavLink>
            </div>

            {/* SALADS */}
            <Cover img='./assets/menu/salad-bg.jpg' title='SALADS' subTitle='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></Cover>
            <MenuCategory items={salad}></MenuCategory>
            <div className='flex justify-center'>
                <NavLink to={`/order/salad`} className='btn btn-outline border-0 border-b-4 mb-10'>ORDER YOUR FAVOURITE FOOD</NavLink>
            </div>

            {/* SOUPS */}
            <Cover img='./assets/menu/soup-bg.jpg' title='SOUPS' subTitle='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></Cover>
            <MenuCategory items={soup}></MenuCategory>
            <div className='flex justify-center'>
                <NavLink to={`/order/soup`} className='btn btn-outline border-0 border-b-4 mb-10'>ORDER YOUR FAVOURITE FOOD</NavLink>
            </div>

        </div>
    );
};

export default Menu;