import React from 'react';
import { Link } from 'react-router';

const DonationPage = ({donation}) => {
    return (
        <div>
            <div className="w-full  py-10 px-4 bg-amber-200">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Donation Request Details</h2>
      <div className="bg-white shadow p-6 rounded">
        <p><strong>Recipient Name:</strong> {donation.recipientName}</p>
        <p><strong>Blood Group:</strong> {donation.bloodGroup}</p>
        <p><strong>Location:</strong> {donation.recipientUpazila}, {donation.recipientDistrict}</p>
        <p><strong>Hospital:</strong> {donation.hospitalName}</p>
        <p><strong>Address:</strong> {donation.fullAddress}</p>
        <p><strong>Date:</strong> {donation.donationDate}</p>
        <p><strong>Time:</strong> {donation.donationTime}</p>
        <Link
                to={`/donation/${donation._id}`}
                className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                View
              </Link>
      </div>
    </div>
        </div>
    );
};

export default DonationPage;