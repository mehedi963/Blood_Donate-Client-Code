import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // adjust path if needed

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchDonor = () => {
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [formData, setFormData] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);

 useEffect(() => {
  fetch('/data/districtsData.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setDistricts(data);

     
    });

  fetch('/data/upazilaData.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setUpazilas(data)
    });
}, []);

  // Filter upazilas when district changes
  useEffect(() => {
    const filtered = upazilas.filter(up => up.district_id === formData.district);
    setFilteredUpazilas(filtered);
  }, [formData.district, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.get('/search-donors', {
        params: formData
      });
      setDonors(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Blood Donors</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select name="bloodGroup" onChange={handleChange} required className="border px-3 py-2 rounded">
          <option value="">Select Blood Group</option>
          {bloodGroups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <select name="district" onChange={handleChange} required className="border px-3 py-2 rounded">
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select name="upazila" onChange={handleChange} required className="border px-3 py-2 rounded">
          <option value="">Select Upazila</option>
          {filteredUpazilas.map(up => (
            <option key={up.id} value={up.name}>{up.name}</option>
          ))}
        </select>

        <button type="submit" className="col-span-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Search
        </button>
      </form>

      {donors.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Found {donors.length} donor(s)</h3>
          <div className="grid gap-4">
            {donors.map(donor => (
              <div key={donor._id} className="border p-4 rounded shadow">
                <h4 className="text-lg font-bold">{donor.name}</h4>
                <p>Email: {donor.email}</p>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>Location: {donor.upazila}, {donor.districtName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
