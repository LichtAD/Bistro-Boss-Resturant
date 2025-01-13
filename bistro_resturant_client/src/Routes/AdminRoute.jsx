import React from 'react';
import UseAdmin from '../Hooks/UseAdmin';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = UseAdmin();
    const [user, loading] = UseAuth();

    const location = useLocation();
    // console.log(location);

    if (loading || isAdminLoading) {
        return <Loading></Loading>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;