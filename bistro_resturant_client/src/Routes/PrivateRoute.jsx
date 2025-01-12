import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Shared/Loading';

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    // console.log(location);

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>;
    }

    if (user && user?.email) {
        return children;
    }

    // return <Navigate to="/login" state={location.pathname}></Navigate>;
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;