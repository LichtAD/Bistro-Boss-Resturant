import React from 'react';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import { IoLogoGoogle } from "react-icons/io";
import Swal from 'sweetalert2';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';

const GoogleLogin = () => {

    const navigate = useNavigate();
    const { signInWithGoogle } = UseAuth();
    const axiosPublic = UseAxiosPublic();  // cz j keo chaile acc create krte prbe

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle(); // Wait for the login to complete
            if (result) {
                // ! add user to database
                const userInfo = { name: result.user?.displayName, email: result.user?.email, photo: result.user?.photoURL };
                await axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        // if (res.data.insertedId) {         // null hle swal show kre na
                        //     // Show success alert only after successful login
                        // }
                        Swal.fire({
                            title: "Congratulations!",
                            text: "You have successfully logged in!",
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/");
                            }
                        });
                    })
            }
        } catch (error) {
            // Handle login failure if necessary
            Swal.fire({
                title: "Login Failed",
                text: error.message || "An error occurred during login.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    }

    return (
        <div className="text-center">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary btn-outline rounded-full"
            >
                <IoLogoGoogle size={20} /> Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;