import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useAuth from '../../../hooks/useAuth'
const Statistics = () => {
  const {user} = useAuth()
  return (
    <div>
      <div >
        <h2 className="text-xl font-bold mb-2">
        Welcome, {user?.displayName || 'Donor'}!
      </h2>
      </div>
      <AdminStatistics />
    </div>
  )
}

export default Statistics
