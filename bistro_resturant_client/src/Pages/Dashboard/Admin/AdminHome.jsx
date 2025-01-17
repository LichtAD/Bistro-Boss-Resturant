import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';

const AdminHome = () => {

    const { user } = UseAuth();

    return (
        <div>
            <h1>
                Hi Welcome
                {
                    user? user.displayName : 'Back Admin'
                }
            </h1>
        </div>
    );
};

export default AdminHome;