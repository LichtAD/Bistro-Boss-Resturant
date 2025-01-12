import React from 'react';
import UseCart from '../../Hooks/UseCart';
import SectionTitle from '../../components/SectionTitle';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const Cart = () => {

    const axiosSecure = UseAxiosSecure();   // localhost 5000 dcche

    const [cart, refetch] = UseCart();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <SectionTitle heading='WANNA ADD MORE?' subHeading='---My Cart---'></SectionTitle>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Total orders: {cart.length}</h1>
                <h1 className='text-3xl font-bold'>Total Price: {totalPrice}</h1>
                <button className='btn bg-orange-400 text-white'>Pay</button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-200'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{item.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <p>${item.price}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className='btn btn-error text-white btn-xs'>delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;