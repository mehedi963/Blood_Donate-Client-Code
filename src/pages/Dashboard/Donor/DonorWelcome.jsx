import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const DonorWelcome = () => {
     const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get('requests/recent')
      .then(res => setRequests(res.data))
      .catch(() => toast.error("Failed to fetch requests"));
  }, [axiosSecure]);


    const updateStatus = async (id, status) => {
    try {
      await axiosSecure.put(`/requests/${id}/status`, { status });
      toast.success(`Request marked as ${status}`);
      setRequests(prev => prev.map(req =>
        req._id === id ? { ...req, status } : req
      ));
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure to delete this request?');
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      toast.success('Request deleted');
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch {
      toast.error('Failed to delete');
    }
  };

    return (
        
             <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        Welcome, {user?.displayName || 'Donor'}!
      </h2>

      {requests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Recent Donation Requests</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === 'inprogress' && (
                        <>
                          <div>{req.donorName}</div>
                          <div>{req.donorEmail}</div>
                        </>
                      )}
                    </td>
                    <td className="space-x-1">
                      {req.status === 'inprogress' && (
                        <>
                          <button onClick={() => updateStatus(req._id, 'done')} className="btn btn-success btn-sm">Done</button>
                          <button onClick={() => updateStatus(req._id, 'canceled')} className="btn btn-warning btn-sm">Cancel</button>
                        </>
                      )}

                      <NavLink to={`/dashboard/edit-donation/${req._id}`}>
                        <button className="btn btn-info btn-sm">Edit</button>
                      </NavLink>

                      <button onClick={() => handleDelete(req._id)} className="btn btn-error btn-sm">Delete</button>

                      <NavLink to={`/dashboard/view-donation/${req._id}`} className="btn btn-secondary btn-sm">View</NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <Link to="/dashboard/my-donation-requests" className="btn btn-primary">
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
       


export default DonorWelcome;