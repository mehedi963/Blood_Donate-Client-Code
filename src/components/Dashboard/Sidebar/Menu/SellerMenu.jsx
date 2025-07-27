import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      {/* <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Plant'
        address='add-plant'
      /> */}
      {/* <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' /> */}
      <MenuItem icon={MdHomeWork} label='All Users' address='all-users' />
      <MenuItem icon={MdHomeWork} label='Content Management ' address='content-management' />
      <MenuItem icon={MdHomeWork} label='All Blood Donation Request' address='all-blood-donation-request' />
      
    </>
  )
}

export default SellerMenu
