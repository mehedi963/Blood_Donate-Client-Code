import React from 'react';
import useAuth from '../../../hooks/useAuth';
import VolunteerAdmist from './VolunteerAdmist';

const VolunteerStatistic = () => {
    const { user } = useAuth()
    return (
        <div className='mt-10'>
            <div >
                <h2 className="text-xl font-bold mb-2">
                    Welcome, {user?.displayName || 'Donor'}!
                </h2>
            </div>

            <div>
                <VolunteerAdmist></VolunteerAdmist>
            </div>
        </div>
    );
};

export default VolunteerStatistic;