import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

const DonationDetails = () => {
  const { id } = useParams()
  let [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const [request, setRequest] = useState([]);
  const closeModal = () => {
    setIsOpen(false)
  }

  
const fetchRequest = async () => {
    try {
      const res = await axiosSecure.get(`/create-donation-request/${id}`);
      setRequest(res.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load donation request');
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);


  console.log(request,id);
  const { bloodGroup, donationDate, donationTime, fullAddress, hospitalName, recipientDistrict, recipientName, recipientUpazila, status, requestMessage, _id } = request
  return (
    <Container>
      <div className='mt-12 mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'> 
        <div className='md:gap-10 flex-1'>
           <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
          <div className="bg-white p-4 shadow rounded space-y-2">
       
        <p><strong>Recipient:</strong> {recipientName}</p>
        <p><strong>District:</strong> {recipientDistrict}</p>
        <p><strong>Upazila:</strong> {recipientUpazila}</p>
        <p><strong>Hospital:</strong> {hospitalName}</p>
        <p><strong>Address:</strong> {fullAddress}</p>
        <p><strong>Blood Group:</strong> {bloodGroup}</p>
        <p><strong>Date & Time:</strong> {donationDate} at {donationTime}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Message:</strong> {requestMessage}</p>
      </div>

       <hr className="my-6" />

          


          <hr className='my-6' />
          <div className='flex justify-between'>
              {status === 'pending' && (
            <div className="flex justify-start">
              <Button onClick={() => setIsOpen(true)} label="Donate" />
            </div>
          )}
          </div>
          <hr className='my-6' />

          <PurchaseModal closeModal={closeModal} donationId={_id} isOpen={isOpen} refresh={fetchRequest} />
         </div>
       </div>
     </Container>
  )
}

export default DonationDetails
