import React from 'react';
import UseAuth from '../../Hooks/UseAuth';

const UserHome = () => {

    const { user } = UseAuth();

    return (
        <div>
            <h2>
                Hi Welcome User
                <span>
                    {
                        user ? user.displayName : 'Back User'
                    }
                </span>
            </h2>
        </div>
    );
};

export default UserHome;