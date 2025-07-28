import React, { useEffect, useState } from 'react';
import DonationPage from './DonationPage';
import LoadingSpinner from '../Shared/LoadingSpinner';
import axios from 'axios';

const Donation = () => {
    // const { id } = useParams();
  const [request, setRequest] = useState([]);
 
 



 useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/create-donation-request`)
      .then(res => setRequest(res.data))
      .catch(err => console.error(err));
  }, []);


  console.log(request);
    return (
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
             {
                request.map(donation => <DonationPage key={donation._id} donation={donation}></DonationPage>)
             }          
        </div>
    );
};

export default Donation;