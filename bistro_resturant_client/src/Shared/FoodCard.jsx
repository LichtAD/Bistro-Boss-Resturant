import React from 'react';

const FoodCard = ({item}) => {

    const { name, image, price, recipe, category } = item;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img className='w-full'
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='bg-slate-900 text-white absolute top-4 right-4 px-4'>${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <p>Category: {category}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;