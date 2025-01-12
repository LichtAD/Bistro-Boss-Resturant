import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import UseCart from '../Hooks/UseCart';

const FoodCard = ({ item }) => {

    const { name, image, price, recipe, category, _id } = item;

    const { user } = UseAuth();
    const navigate = useNavigate();

    const location = useLocation();

    const axiosSecure = UseAxiosSecure();

    const [, refetch] = UseCart();       // , dsi cz 1st data lagbe na amader

    const handleAddToCart = () => {
        // console.log(food);
        if (user?.email) {
            // send cart to database
            // console.log(user.email, food);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name: name,
                image: image,
                price: price
            }
            // fetch data and send
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart data to update cart items count
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You have to login first",
                text: "You have to login to order food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

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
                    <button onClick={() => handleAddToCart(item)} className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;