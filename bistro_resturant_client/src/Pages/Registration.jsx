import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import registerAnimation from '../assets/lottie/register.json';
import { Helmet } from 'react-helmet-async';

import { useForm } from "react-hook-form";
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import UseAuth from '../Hooks/UseAuth';
import GoogleLogin from './GoogleLogin';

const Registration = () => {

    const axiosPublic = UseAxiosPublic();

    const navigate = useNavigate();

    const [error, setError] = useState('');

    // start
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { createNewUser, updateMyProfile, setUser } = UseAuth();

    const onSubmit = (data) => {
        console.log(data);

        createNewUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;
                // setUser(result.user);
                // console.log(result.user);

                // start
                Swal.fire({
                    title: "Congratulations!",
                    text: "You have successfully registered!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateMyProfile({ displayName: data.name, photoURL: data.photo })
                            // navigate('/');
                            .then(() => {
                                setUser({ ...newUser, displayName: data.name, photoURL: data.photo });
                                // ! create user entry in database
                                const userInfo = { name: data.name, email: data.email, photo: data.photo };
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if(res.data.insertedId) {
                                            navigate('/');
                                        }
                                })
                                // navigate('/');
                            })
                            .catch(err => {
                                const errorMessage = err.message;
                                // console.log({ errorMessage });
                                setError(errorMessage);
                                toast.error(errorMessage, {
                                    position: "top-right",
                                    autoClose: 2000
                                })
                            })
                    }
                })
                // end
            })
            .catch(err => {
                const errorMessage = err.message;
                // console.log({ errorMessage });
                setError(errorMessage);
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 2000
                })
            })

    };
    // end

    // ! toggle password

    const [showPassword, setShowPassword] = useState(false);
    const handleShowHidePassword = (event) => {
        event.stopPropagation();
        event.preventDefault();
        return setShowPassword(prev => !prev);
    }

    return (
        <div>
            <Helmet>
                <title>Registration | Bistro Boss</title>
            </Helmet>
            <div className='flex justify-center items-center h-screen'>
                <div className="text-center">
                    {/* <h1 className="text-5xl font-bold">Register now!</h1> */}
                    <Lottie className='w-[50%] mx-auto' animationData={registerAnimation}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                    <h1 className="text-center text-3xl font-bold my-4">Register Now</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">Email is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name='photo' {...register("photo")} placeholder="photo url" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'}
                                name='password'
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[0-9])/
                                })}
                                placeholder="password" className="input input-bordered" />

                            {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500">Password must contain at least one uppercase letter and one number</span>}

                            <button onClick={handleShowHidePassword} className='absolute right-3 top-12 btn btn-xs'>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>
                        </div>

                        {
                            error && <p className='text-red-600'>{error}</p>
                        }

                        <div className="form-control mt-1">
                            <button className="btn btn-primary">Register</button>
                        </div>

                        <div className='my-2'>
                            <h1>Already have an account? <Link to={'/login'} className='text-primary link link-hover'>Login</Link></h1>
                        </div>

                        {/* google login */}
                        <GoogleLogin></GoogleLogin>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;