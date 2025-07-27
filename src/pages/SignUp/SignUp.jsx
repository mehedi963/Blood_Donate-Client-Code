import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { imageUpload, saveUserDB, } from '../../api/utilities'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [uploadImage, setUploadImage] = useState(null);
  const [districts, setDistricts] = useState([])
  const [upazilasData, setUpazilasData] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedUpazila, setSelectedUpazila] = useState('')
  

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


  const handleImageUpload = async e => {
    e.preventDefault()
    const image = e.target.files[0]
    try {
      const imageURL = await imageUpload(image);
      setUploadImage(imageURL)
    } catch (err) {
      console.log(err);
      setUploadImage("Image Upload Fail")
    }

  }

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value
    const bloodGroup = form.bloodGroup.value
    const district = form.district.value
    const upazila = form.upazila.value
    const image = form?.image?.files[0]
    console.log(bloodGroup, district, upazila,image);

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    if (!uploadImage) {
      return toast.error("Please upload an image first")
    }

    try {
      const imageURL = await imageUpload(image);
      setUploadImage(imageURL)
    } catch (err) {
      console.log(err);
      setUploadImage("Image Upload Fail")
    }

    try {
      //2. User Registration
      const result = await createUser(email, password)

      //3. Save username & profile photo
      await updateUserProfile(
        name,
       uploadImage,
      )
      console.log(result)

      const userData = {
        name,
        email,
        password,
        confirmPassword,
        image : uploadImage,
        bloodGroup,
        district,
        upazila,
        role: 'donor',
        status: 'active',
      }
      console.log(userData);
      await saveUserDB(userData)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()

      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            {/* Name field */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            {/* Email field */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            {/* Password field */}
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label className='block mb-2 text-sm'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full px-3 py-2 border rounded-md bg-gray-200'
                required
              />
            </div>
          </div>
          {/* Image Upload */}
          <div>
            <label htmlFor='image' className='block mb-2 text-md'>Upload Avatar</label>
            <input className='bg-gray-200 cursor-pointer' type='file' name='image' accept='image/*' onChange={handleImageUpload} />
            {uploadImage && <img src={uploadImage} alt='avatar' className='w-12 h-12 mt-2 rounded-full' />}
          </div>

          {/* Blood Group */}
          <div>
            <label className='block mb-2 text-sm'>Blood Group</label>
            <select name='bloodGroup' required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className='block mb-2 text-sm'>District</label>
            <select name='district' value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className='block mb-2 text-sm'>Upazila</label>
            <select name='upazila' value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} required className='w-full px-3 py-2 border rounded-md bg-gray-200'>
              <option value=''>Select Upazila</option>
              {upazilasData.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
