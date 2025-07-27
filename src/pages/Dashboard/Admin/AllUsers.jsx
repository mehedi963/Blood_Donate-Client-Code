import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiMoreVertical } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState('all');

  // React Query: Load all users based on status filter
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', filter],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users?status=${filter}`);
      return data.users;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
      toast.success(`User ${newStatus}`);
      refetch();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleRoleUpdate = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role });
      toast.success(`Role changed to ${role}`);
      refetch();
    } catch {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <select
          className="border px-3 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Avatar</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">
                    <img
                      src={user?.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                  <td className="p-2 capitalize">{user.status}</td>
                  <td className="p-2 relative">
                    <div className="dropdown dropdown-left">
                      <button tabIndex={0} className="btn btn-sm btn-outline">
                        <FiMoreVertical />
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 z-10"
                      >
                        {user.status === 'active' && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(user._id, 'blocked')
                              }
                            >
                              Block
                            </button>
                          </li>
                        )}
                        {user.status === 'blocked' && (
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(user._id, 'active')
                              }
                            >
                              Unblock
                            </button>
                          </li>
                        )}
                        {user.role !== 'volunteer' && (
                          <li>
                            <button
                              onClick={() =>
                                handleRoleUpdate(user._id, 'volunteer')
                              }
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== 'admin' && (
                          <li>
                            <button
                              onClick={() => handleRoleUpdate(user._id, 'admin')}
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;






// import { useQuery } from '@tanstack/react-query'
// import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import { data } from 'react-router'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure()
//  const {data : users, isLoading,refetch} = useQuery({
//   queryKey : ['users'],
//   queryFn : async ()=>{
//     const {data} = await axiosSecure('/users')
//     return data
//   }
//  })

//  console.log(users);
// if(isLoading) return <LoadingSpinner></LoadingSpinner>
//   return (
//     <>
//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Avatar
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Email
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Role
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Status
//                     </th>
                    

//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     users.map(user => <SellerOrderDataRow key={user._id} 
//                     user = {user}
//                     ></SellerOrderDataRow>)
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default AllUsers


