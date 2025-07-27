
import {  } from "react"


const AddPlantForm = () => {
  // const {user} = useAuth()
  // const [districts, setDistricts] = useState([])
  //   const [upazilasData, setUpazilasData] = useState([])
  //   const [selectedDistrict, setSelectedDistrict] = useState('')
  //   const [selectedUpazila, setSelectedUpazila] = useState('')
  //    const [formData, setFormData] = useState({
  //   recipientName: '',
  //   recipientDistrict: '',
  //   recipientUpazila: '',
  //   hospitalName: '',
  //   fullAddress: '',
  //   bloodGroup: '',
  //   donationDate: '',
  //   donationTime: '',
  //   requestMessage: ''
  // })
  //   useEffect(() => {
  //   fetch('/districts.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       const distData = data.find(item => item.name === 'districts' && item.type === 'table')?.data || []
  //       console.log(distData);
  //       setDistricts(distData)
  //     })

  //   fetch('/upazilas.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       const upazilaTable = data.find(item => item.name === 'upazilas' && item.type === 'table')
  //       const upazilaData = upazilaTable?.data || []
  //       console.log(upazilaData);
  //       setUpazilasData(upazilaData)
  //     })
  // }, [])

  //  const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const form = event.target
   
  //   const fullAddress = form.fullAddress.value
  //   const requestMessage = form.requestMessage.value
  //   const donationDate = form.donationDate.value
  //   const donationTime = form.donationTime.value
  //   const recipientName = form.recipientName.value
  //   const hospitalName = form.hospitalName.value
  //   const bloodGroup = form.bloodGroup.value
  //   const recipientDistrict = form.recipientDistrict.value
  //   const recipientUpazila = form.recipientUpazila.value
  //   console.log(fullAddress,recipientName,requestMessage,donationDate,donationTime,hospitalName,bloodGroup,recipientDistrict,recipientUpazila);
    

    // try {
    //   const res = await fetch('/api/donation-requests', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(requestData)
    //   })

    //   const result = await res.json()

    //   if (res.ok) {
    //     toast.success('Donation request submitted!')
    //     navigate('/dashboard/my-donation-requests')
    //   } else {
    //     toast.error(result.message || 'Something went wrong')
    //   }
    // } catch (err) {
    //   toast.error('Server error')
    // }
  // }

  return (

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">🆕 Create Donation Request</h2>

      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
        {/* Requester Name and Email (readonly) */}
        
          {/* <label className='block mb-2 text-sm'>Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            className="input input-bordered w-full"
            placeholder="Requester Name"
             readOnly
          /> */}

          {/* <label className='block mb-2 text-sm'>Requester Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ''}
            className="input input-bordered w-full"
            placeholder="Requester Email"
          /> */}
        

        {/* Recipient Name */}
        {/* <label className='block mb-2 text-sm'>Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
          required
        /> */}

        {/* District & Upazila */}
        {/* <div className="grid grid-cols-2 gap-4">
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleDistrictChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districtsData.map((d, i) => (
              <option key={i} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u, i) => (
              <option key={i} value={u}>{u}</option>
            ))}
          </select>
        </div> */}
        
         {/* District */}
          {/* <div>
            <label className='block mb-2 text-sm'>District</label>
            <select name='recipientDistrict' value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div> */}

          {/* Upazila */}
          {/* <div>
            <label className='block mb-2 text-sm'>Upazila</label>
            <select name='recipientUpazila' value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Upazila</option>
              {upazilasData.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div> */}

        {/* Hospital Name */}
        {/* <label className='block mb-2 text-sm'>Hospital Name</label>
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="input input-bordered w-full"
          required
        /> */}

        {/* Full Address */}
        {/* <label className='block mb-2 text-sm'>Recipient Full Address</label>
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="input input-bordered w-full"
          required
        /> */}

        {/* Blood Group, Date & Time */}
        {/* <div>
            <label className='block mb-2 text-sm'>Blood Group</label>
            <select name='bloodGroup' required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div> */}

        {/* Blood Group, Date & Time */}
        {/* <div className="grid grid-cols-3 gap-4">
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>{bg}</option>
            ))}
          </select>

          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div> */}

            {/* Request Message */}
            
            {/* Date */}
             {/* <label className='block mb-2 text-sm'>Donation Date</label>
            <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          /> */}

           {/* Time */}
             {/* <label className='block mb-2 text-sm'>Donation Time</label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          /> */}
            
            {/* <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              placeholder="Why do you need blood? Please explain in detail..."
              className="textarea textarea-bordered w-full h-32"
              required
            /> */}

        {/* <button type="submit" className="btn btn-primary w-full">
          Request
        </button> */}
      {/* </form> */}
    </div>
  )
}


    // <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
    //   <form>
    //     <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
    //       <div className='space-y-6'>
    //         {/* Name */}
    //         <div className='space-y-1 text-sm'>
    //           <label htmlFor='name' className='block text-gray-600'>
    //             Name
    //           </label>
    //           <input
    //             className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
    //             name='name'
    //             id='name'
    //             type='text'
    //             placeholder='Plant Name'
    //             required
    //           />
    //         </div>
    //         {/* Category */}
    //         <div className='space-y-1 text-sm'>
    //           <label htmlFor='category' className='block text-gray-600 '>
    //             Category
    //           </label>
    //           <select
    //             required
    //             className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
    //             name='category'
    //           >
    //             <option value='Indoor'>Indoor</option>
    //             <option value='Outdoor'>Outdoor</option>
    //             <option value='Succulent'>Succulent</option>
    //             <option value='Flowering'>Flowering</option>
    //           </select>
    //         </div>
    //         {/* Description */}
    //         <div className='space-y-1 text-sm'>
    //           <label htmlFor='description' className='block text-gray-600'>
    //             Description
    //           </label>

    //           <textarea
    //             id='description'
    //             placeholder='Write plant description here...'
    //             className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
    //             name='description'
    //           ></textarea>
    //         </div>
    //       </div>
    //       <div className='space-y-6 flex flex-col'>
    //         {/* Price & Quantity */}
    //         <div className='flex justify-between gap-2'>
    //           {/* Price */}
    //           <div className='space-y-1 text-sm'>
    //             <label htmlFor='price' className='block text-gray-600 '>
    //               Price
    //             </label>
    //             <input
    //               className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
    //               name='price'
    //               id='price'
    //               type='number'
    //               placeholder='Price per unit'
    //               required
    //             />
    //           </div>

    //           {/* Quantity */}
    //           <div className='space-y-1 text-sm'>
    //             <label htmlFor='quantity' className='block text-gray-600'>
    //               Quantity
    //             </label>
    //             <input
    //               className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
    //               name='quantity'
    //               id='quantity'
    //               type='number'
    //               placeholder='Available quantity'
    //               required
    //             />
    //           </div>
    //         </div>
    //         {/* Image */}
    //         <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
    //           <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
    //             <div className='flex flex-col w-max mx-auto text-center'>
    //               <label>
    //                 <input
    //                   className='text-sm cursor-pointer w-36 hidden'
    //                   type='file'
    //                   name='image'
    //                   id='image'
    //                   accept='image/*'
    //                   hidden
    //                 />
    //                 <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
    //                   Upload
    //                 </div>
    //               </label>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Submit Button */}
    //         <button
    //           type='submit'
    //           className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
    //         >
    //           Save & Continue
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
//   )
// }

export default AddPlantForm
