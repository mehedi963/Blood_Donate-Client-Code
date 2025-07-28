import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';


const PurchaseModal = ({ closeModal, isOpen, donationId, refresh }) => {
  const { user } = useAuth();
  console.log(donationId);

   const handleConfirm = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/create-donation/confirm/${donationId}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      });

      if (res.data?.modifiedCount > 0) {
        toast.success('Donation confirmed!');
        closeModal();
        refresh?.();
      } else {
        toast.error('Failed to confirm donation');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };


  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Confirm Donation
            </DialogTitle>
             <div className='mt-4 space-y-2 text-gray-700'>
              <p><strong>Donor Name:</strong> {user.displayName}</p>
              <p><strong>Donor Email:</strong> {user.email}</p>
            </div>

            <div className='mt-6 flex justify-between gap-4'>
              <button
                onClick={handleConfirm}
                className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
