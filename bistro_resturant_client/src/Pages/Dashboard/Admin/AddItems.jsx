import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()

    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const onSubmit = async (data) => {
        console.log('form submitted', data)
        // image upload to imgbb and get url
        const imageFile = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log('image uploaded', res.data);
        console.log('image url', res.data.data.display_url);
        if (res.data.success) {
            // send data to server with image
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // server e pathabo fetch kre
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log('menu res', menuRes.data);
            if (menuRes.data.insertedId) {
                // alert('Item added successfully');
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} added to the menu successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('res.data with image url', res.data);
    };

    return (
        <div>
            <SectionTitle heading='ADD AN ITEM' subHeading="---What's new?---"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Reciepe Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            {...register("name", { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </label>

                    <div className='grid grid-cols-2 gap-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>

                            <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>

                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full" />
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea {...register("recipe", { required: true })} rows="4" cols="50" className="textarea textarea-bordered" placeholder="Recipe Details"></textarea>
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Item Image*</span>
                        </div>
                        <input
                            type="file"
                            {...register("image")}
                            className="file-input file-input-bordered" />
                    </label>

                    <input className="btn btn-block" type="submit" value="Add Item" />
                </form>
            </div>
        </div>
    );
};

export default AddItems;