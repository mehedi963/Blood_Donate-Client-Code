import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-50 py-16 px-6 text-center rounded-xl shadow-md">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
        Donate Blood, Save Lives
      </h1>
      <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
        Your donation can bring hope to someone in need. Be a hero today by joining our donor community or find a donor instantly.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate('/signup')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Join as a Donor
        </button>
        <button
          onClick={() => navigate('/funding')}
          className="bg-white border-2 border-red-600 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-lg transition"
        >
          Search Donors
        </button>
      </div>
    </div>
  )
}

export default Banner;
