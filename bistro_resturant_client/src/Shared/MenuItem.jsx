import React from 'react';

const MenuItem = ({item}) => {

    const {name, price, recipe, image} = item;

    return (
        <div className='flex gap-4'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[120PX]' src={image} alt="" />
            <div>
                <h2 className='uppercase'>{name}</h2>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>Price: ${price}</p>
        </div>
    );
};

export default MenuItem;