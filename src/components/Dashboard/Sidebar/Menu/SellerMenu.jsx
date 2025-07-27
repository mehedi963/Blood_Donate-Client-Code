import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
     
      <MenuItem icon={MdHomeWork} label='All Blood Donation Request' address='all-blood-donation-request' />
      <MenuItem icon={MdHomeWork} label='Content Management ' address='content-management' />
      
      
    </>
  )
}

export default SellerMenu
