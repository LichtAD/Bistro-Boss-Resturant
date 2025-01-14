import React from 'react';
import UseAdmin from '../Hooks/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import UseAuth from '../Hooks/UseAuth';

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = UseAdmin();
    const {user, loading} = UseAuth();

    const location = useLocation();
    // console.log(location);

    if (loading || isAdminLoading) {
        return <Loading></Loading>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;