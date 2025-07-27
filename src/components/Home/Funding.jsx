import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Funding = () => {
    const [funds, setFunds] = useState([]);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    axiosSecure.get('/funds')
      .then(res => setFunds(res.data))
      .catch(err => console.error('Funding fetch error:', err));
  }, [axiosSecure]);
    return (
        <div className='mt-12'>
             <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Funding History</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Give Fund
        </button>
      </div>

      <table className="w-full border shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Amount</th>
            <th className="text-left p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {funds.map(fund => (
            <tr key={fund._id} className="border-t">
              <td className="p-3">{fund.name}</td>
              <td className="p-3">${fund.amount}</td>
              <td className="p-3">{new Date(fund.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>
    );
};

export default Funding;