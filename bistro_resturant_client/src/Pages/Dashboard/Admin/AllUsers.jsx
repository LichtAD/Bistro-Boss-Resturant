import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { FaUser } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {

    // only admin dekhbe so axiosSecure use korbo
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleDeleteUser = (user) => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();           // <-------------------------
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

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <SectionTitle heading='MANAGE ALL USERS' subHeading='---How many??---'></SectionTitle>
            <h1 className='text-3xl font-bold mt-5'>Total Users: {users.length}</h1>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <th><img className='w-12 h-12 rounded-full' src={user.photo} alt="" /></th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    {
                                        user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn btn-xs bg-orange-400 text-white'><FaUser /></button>
                                    }
                                </td>

                                <td><button className='btn btn-xs bg-red-400 text-white' onClick={() => handleDeleteUser(user)}><FaTrashAlt /></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;