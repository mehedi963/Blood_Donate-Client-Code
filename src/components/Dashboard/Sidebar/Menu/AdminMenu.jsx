import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='All Users' address='all-users' />
      <MenuItem icon={FaUserCog} label='Statistics' address='statistic' />
      <MenuItem icon={FaUserCog} label='Content Management ' address='content-management' />
      {/* <MenuItem icon={FaUserCog} label='Add Blog ' address='/dashboard/content-management/add-blog' /> */}
      <MenuItem icon={FaUserCog} label='All Blood Donation Request' address='all-blood-donation-request' />
      
    </>
  )
}

export default AdminMenu
