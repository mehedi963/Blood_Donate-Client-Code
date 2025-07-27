import { Navigate,  } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import userRole from '../hooks/userRole'

const volunteerRoute = ({ children }) => {
  
  const [role, isRoleLoading] = userRole()
  
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'seller') return children
  return <Navigate to='/'  />
}

export default volunteerRoute