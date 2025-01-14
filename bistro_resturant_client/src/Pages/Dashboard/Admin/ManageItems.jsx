import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import UseMenu from '../../../Hooks/UseMenu';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { NavLink } from 'react-router-dom';

const ManageItems = () => {
    const [menu, loading, refetch] = UseMenu();
    // console.log(menu);

    const axiosSecure = UseAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <SectionTitle heading='MANAGE ITEMS' subHeading='---Manage All Items---'></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            menu.map((item, index) => <tr key={item._id} className="hover">
                                <td>{index + 1}</td>
                                <th><img src={item.image} className="w-12" alt="" /></th>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td><NavLink to={`/dashboard/updateItem/${item._id}`} className="btn btn-ghost btn-xs bg-orange-400 text-white">Update</NavLink></td>
                                <td><button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs bg-red-500 text-white">Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;