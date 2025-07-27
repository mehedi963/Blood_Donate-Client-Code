import React from 'react';
import userRole from '../../../hooks/userRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import DonorWelcome from '../Donor/DonorWelcome';
import AdminWelcome from '../Admin/AdminWelcome';

const StatisticRoute = () => {
    const [role, isRoleLoading] = userRole()
    console.log(role);


    if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            {  role === 'donor' && <DonorWelcome></DonorWelcome> }
            {  role === 'admin' && <AdminWelcome></AdminWelcome>}
        </div>
    );
};

export default StatisticRoute;