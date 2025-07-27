import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/donation-requests/${id}`, formData);
      alert('Request updated successfully!');
      navigate('/dashboard/my-donation-requests');
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  if (!formData) return <p>Loading...</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          placeholder="District"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          placeholder="Upazila"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          placeholder="Donation Date"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          placeholder="Donation Time"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border px-4 py-2"
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-full border px-4 py-2"
        />
        <textarea
          name="whyNeedBlood"
          value={formData.whyNeedBlood}
          onChange={handleChange}
          placeholder="Why do you need blood?"
          className="w-full border px-4 py-2"
        ></textarea>
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