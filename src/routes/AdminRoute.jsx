import { Navigate,  } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import userRole from '../hooks/userRole'

const AdminRoute = ({ children }) => {
  
  const [role, isRoleLoading] = userRole()
  console.log("Admin Routes");
  
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/'  />
}

export default AdminRoute
