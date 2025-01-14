import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {

    
    const { _id, name, category, price, recipe, image } = useLoaderData();
    console.log({ _id, name, category, price, recipe, image });
    
    const [img, setImg] = useState(image);

    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const { register, handleSubmit, watch } = useForm();
    console.log(watch());

    const onSubmit = async (data) => {
        console.log('form submitted', data)
        // image upload to imgbb and get url
        const imageFile = { image: data.image[0] };
        console.log(imageFile);

        let res
        if (imageFile.image) {
            res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            setImg(res?.data?.data?.display_url || image);
        }

        // console.log('image uploaded', res.data);
        // console.log('image url', res.data.data.display_url);

        // send data to server with image
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res?.data?.success ? res.data.data.display_url : image
        }
        // server e pathabo fetch kre
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log('menu res', menuRes.data);
        if (menuRes.data.modifiedCount > 0) {
            // alert('Item added successfully');
            // reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} updated successfully`,
                showConfirmButton: false,
                timer: 1500
            })
        }

        console.log('res.data with image url', res.data);
    };

    // useEffect(() => {
    //     setValue('image', image)
    // }, [])

    return (
        <div>
            <h1 className='text-4xl text-center'>Update Item</h1>
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
                            defaultValue={name}
                            required
                            className="input input-bordered w-full" />
                    </label>

                    <div className='grid grid-cols-2 gap-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>

                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full">
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
                                defaultValue={price}
                                className="input input-bordered w-full" />
                        </label>
                    </div>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea
                            {...register("recipe", { required: true })}
                            defaultValue={recipe}
                            rows="4"
                            cols="50"
                            className="textarea textarea-bordered"
                            placeholder="Recipe Details"></textarea>
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Item Image*</span>
                        </div>
                        <input
                            type="file"
                            {...register("image")}
                            // defaultValue={image}
                            className="file-input file-input-bordered" />
                    </label>

                    <div><img src={img} alt="" /></div>

                    <input className="btn btn-block" type="submit" value="Update Item" />
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;