import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const EditDonor = () => {
    
    const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching request data:', err);
      }
    };
    fetchRequest();
  }, [id, axiosSecure]);
console.log(formData);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const [districts, setDistricts] = useState([])
    const [upazilasData, setUpazilasData] = useState([])
  
    // Load districts & upazilas from public folder
    useEffect(() => {
      fetch('/districts.json')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const distData = data.find(item => item.name === 'districts' && item.type === 'table')?.data || []
          console.log(distData);
          setDistricts(distData)
        })
  
      fetch('/upazilas.json')
        .then(res => res.json())
        .then(data => {
          const upazilaTable = data.find(item => item.name === 'upazilas' && item.type === 'table')
          const upazilaData = upazilaTable?.data || []
          console.log(upazilaData);
          setUpazilasData(upazilaData)
        })
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); 
     const dataToUpdate = { ...formData };
  delete dataToUpdate._id;   
    try {
      await axiosSecure.put(`/donation-requests/${id}`, dataToUpdate);
      toast.success('Request updated successfully!');
      navigate('/dashboard/my-donation-requests');
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  if (!formData) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">


       
        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="w-full border px-4 py-2"
        />
        </div>

         {/* District & Upazila */}
        <div>
          <label className="label">Recipient District</label>
          <select name="recipientDistrict"  value={formData.recipientDistrict} onChange={handleChange}   className="select select-bordered w-full" required>
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Recipient Upazila</label>
          <select name="recipientUpazila" value={formData.recipientUpazila} onChange={handleChange}    className="select select-bordered w-full" required>
            <option value="">Select Upazila</option>
            {upazilasData.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

            {/* Date & Time */}
        <div>
          <label className="label">Donation Date</label>
          <input
          type="text"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          placeholder="Donation Date"
          className="w-full border px-4 py-2"
        />
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange}   className="input input-bordered w-full" required />
        </div>
        

        {/* Blood Group */}
          <div>
            <label className='block mb-2 text-sm'>Status</label>
            <select name='status' value={formData.status} onChange={handleChange} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Status</option>
              {['panding', 'inprogress'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        {/* Blood Group */}
          <div>
            <label className='block mb-2 text-sm'>Blood Group</label>
            <select name='bloodGroup' value={formData.bloodGroup} onChange={handleChange} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full border px-4 py-2"
        />
        </div>
        
        {/* Address */}
        <div>
          <label className="label">Full Address</label>
         <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border px-4 py-2"
        />        
        </div>   

        <div>
          <label className="label">Contact Number</label>              
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full border px-4 py-2"
        />
        </div> 

        <div>
          <label className="label">Contact Number</label>              
        <textarea
          name="whyNeedBlood"
          value={formData.whyNeedBlood}
          onChange={handleChange}
          placeholder="Why do you need blood?"
          className="w-full border px-4 py-2"
        ></textarea> 
        
        </div>       
        
       

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditDonor;