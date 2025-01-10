import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoLogoGoogle } from "react-icons/io";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/lottie/Login.json';
import { Helmet } from 'react-helmet-async';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const { logInUser, setUser } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const location = useLocation();
    // console.log(location);

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });

        logInUser(email, password)
            .then(result => {
                setUser(result.user);
                // console.log(result.user);
                Swal.fire({
                    title: "Congratulations!",
                    text: "You have successfully logged in!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(location?.state ? location.state : "/")
                    }
                })
                form.reset();
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
    }

    // ! toggle password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowHidePassword = (event) => {
        event.stopPropagation();
        event.preventDefault();

        return setShowPassword(prev => !prev);
    }

    // ! validate captcha
    // const capthaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    const handleValidateCaptcha = (event) => {

        const user_captcha_value = event.target.value;
        // console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
    }

    return (
        <div>
            <Helmet>
                <title>Login | Bistro Boss</title>
            </Helmet>
            <div className='flex justify-center items-center h-screen'>

                <div className="text-center lg:text-left">
                    {/* <h1 className="text-5xl font-bold ml-16">Login now!</h1> */}
                    <Lottie className='w-[100%] mx-auto' animationData={loginAnimation}></Lottie>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                    <h1 className="text-center text-3xl font-bold my-4">Login Now</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />

                            <button onClick={handleShowHidePassword} className='absolute right-3 top-12 btn btn-xs'>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>

                            <label className="label">
                                <button className="label-text-alt link link-hover">Forgot password?</button>
                            </label>
                        </div>

                        {
                            error && <p className='text-red-600'>{error}</p>
                        }

                        {/* captcha */}
                        <div className="form-control relative">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Enter Captcha" className="input input-bordered" required />
                            {/* <button onClick={handleValidateCaptcha} className='btn btn-xs btn-outline mt-2'>Validate</button> */}
                        </div>

                        <div className="form-control mt-1">
                            <button disabled={disabled} className="btn btn-primary">Login</button>
                        </div>

                        <div className='my-2'>
                            <h1>Don't have an account? <Link to={'/registration'} className='text-primary link link-hover'>Register</Link></h1>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={async () => {
                                    try {
                                        const result = await signInWithGoogle();
                                        if (result) {
                                            Swal.fire({
                                                title: "Congratulations!",
                                                text: "You have successfully logged in!",
                                                icon: "success",
                                                confirmButtonText: "OK",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    navigate(location?.state ? location.state : "/");
                                                }
                                            });
                                        }
                                    } catch (error) {
                                        Swal.fire({
                                            title: "Login Failed",
                                            text: error.message || "An error occurred during login.",
                                            icon: "error",
                                            confirmButtonText: "Try Again",
                                        });
                                    }
                                }}
                                className="btn btn-primary btn-outline rounded-full"
                            >
                                <IoLogoGoogle size={20} /> Login with Google
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;