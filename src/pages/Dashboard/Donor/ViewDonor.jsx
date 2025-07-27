import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ViewDonor = () => {
    const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error('Failed to fetch donation request', err);
      }
    };
    fetchRequest();
  }, [id, axiosSecure]);

  if (!request) return <LoadingSpinner></LoadingSpinner>
    return (
         <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donation Request Details</h2>
      <div className="space-y-2">
        <p><strong>Recipient:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Date & Time:</strong> {request.donationDate} at {request.donationTime}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Full Address:</strong> {request.fullAddress}</p>
        <p><strong>Status:</strong> {request.status}</p>
        {request.status === 'inprogress' && (
          <>
            <p><strong>Donor:</strong> {request.donorName}</p>
            <p><strong>Donor Email:</strong> {request.donorEmail}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDonor;