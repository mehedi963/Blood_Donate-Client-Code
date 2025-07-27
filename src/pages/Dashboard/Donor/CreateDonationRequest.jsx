
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
          recipientName: '',
          recipientDistrict: '',
          recipientUpazila: '',
          hospitalName: '',
          fullAddress: '',
          bloodGroup: '',
          donationDate: '',
          donationTime: '',
          requestMessage: '',
        });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const form = e.target
    const bloodGroup = form.bloodGroup.value
    const recipientDistrict = form.recipientDistrict.value
    const recipientUpazila = form.recipientUpazila.value
    const recipientName = form.recipientName.value
    const requestMessage = form.requestMessage.value
    const donationTime = form.donationTime.value
    const donationDate = form.donationDate.value
    const fullAddress = form.fullAddress.value
    const hospitalName = form.hospitalName.value
    
    console.log(bloodGroup,recipientDistrict,recipientUpazila,recipientName,requestMessage,donationDate,donationTime,hospitalName,fullAddress);
    const dataToSend = {
      ...formData,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
    };



    try {
      const res = await axiosSecure.post('/create-donation-request', dataToSend);
      if (res.data.insertedId) {
        toast.success('Donation request created successfully');
        setFormData({
          recipientName: '',
          recipientDistrict: '',
          recipientUpazila: '',
          hospitalName: '',
          fullAddress: '',
          bloodGroup: '',
          donationDate: '',
          donationTime: '',
          requestMessage: '',
        });
      }
    } catch (err) {
      toast.error('Failed to create request');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Readonly fields */}
        <div>
          <label className="label">Requester Name</label>
          <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Requester Email</label>
          <input type="email" value={user?.email || ''} readOnly className="input input-bordered w-full" />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input name="recipientName" value={formData.recipientName} onChange={handleChange}   className="input input-bordered w-full" required />
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

        {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input name="hospitalName" value={formData.hospitalName} onChange={handleChange}  className="input input-bordered w-full" required />
        </div>

        {/* Address */}
        <div>
          <label className="label">Full Address</label>
          <input name="fullAddress" value={formData.fullAddress} onChange={handleChange}  className="input input-bordered w-full" required />
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

        {/* Date & Time */}
        <div>
          <label className="label">Donation Date</label>
          <input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange}  className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="label">Donation Time</label>
          <input type="time" name="donationTime" value={formData.donationTime} onChange={handleChange}   className="input input-bordered w-full" required />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea name="requestMessage"  value={formData.requestMessage} onChange={handleChange}  rows="4" className="textarea textarea-bordered w-full" required />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Request</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
