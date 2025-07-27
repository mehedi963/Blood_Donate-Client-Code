import React, { useEffect, useState } from 'react';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { NavLink } from 'react-router';
import userRole from '../../../hooks/userRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const BloodDonationRequest = () => {
  const [role,isRoleLoading] = userRole()
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url =
          filter === 'all'
            ? '/all-donation-requests'
            : `/all-donation-requests?status=${filter}`;
        const res = await axiosSecure.get(url);
        setRequests(res.data);
      } catch (err) {
         const message =
        err?.response?.data?.message || err.message || 'Unknown error occurred';
      console.error('Failed to fetch donation requests:', message);
      }
    };
    fetchRequests();
  }, [filter, axiosSecure]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this request?');
    if (!confirmDelete) return;
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error('Failed to delete donation request', err);
    }
  };

if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
 const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.put(`/donation-requests/${id}/status`, {
        status: newStatus,
      });

      if (res.data.message === 'Status updated') {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || 'Failed to update status';
      console.error(message);
    }
  };

  

 return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Donation Requests</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select
          className="border px-3 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {requests.length === 0 ? (
        <p>No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Recipient</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Blood Group</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Requester Info</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="border p-2">{req.recipientName}</td>
                  <td className="border p-2">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="border p-2">{req.donationDate}</td>
                  <td className="border p-2">{req.donationTime}</td>
                  <td className="border p-2">{req.bloodGroup}</td>
                  <td className="border p-2">{req.status}</td>
                  <td className="border p-2">
                    {req.status === 'inprogress' ? (
                      <div>
                        <p>{req.requesterName}</p>
                        <p>{req.requesterEmail}</p>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    {
                      role === 'admin' 
                    }
                    {req.status === 'inprogress' && (
                      <>
                        <button
                          className="text-green-600"
                          onClick={() => handleStatusChange(req._id, 'done')}
                        >
                          Done
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => handleStatusChange(req._id, 'canceled')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <NavLink to={`/dashboard/edit-donation/${req._id}`}>
                      <button className="text-blue-600">Edit</button>
                    </NavLink>

                    {
                      role === 'admin' && <button
                      className="text-red-600"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                    }
                    {
                      role === 'admin' && <NavLink to={`/dashboard/view-donation/${req._id}`}>
                      <button>View</button>
                    </NavLink>
                    }
                    
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default BloodDonationRequest;