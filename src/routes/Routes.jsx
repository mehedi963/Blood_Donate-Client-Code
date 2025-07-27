import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddPlant from '../pages/Dashboard/Seller/AddPlant'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import MyDonationRequests from '../pages/Dashboard/Donor/MyDonationRequests'
import CreateDonationRequest from '../pages/Dashboard/Donor/CreateDonationRequest'
import AllUsers from '../pages/Dashboard/Admin/AllUsers'
import BloodDonationRequest from '../pages/Dashboard/Admin/BloodDonationRequest'
import ContentManagement from '../pages/Dashboard/Admin/ContentManagement '
import StatisticRoute from '../pages/Dashboard/Common/StatisticRoute'
import Donation from '../components/Home/Donation'
import Blogs from '../components/Home/Blogs'
import Funding from '../components/Home/Funding'
import EditDonor from '../pages/Dashboard/Donor/EditDonor'
import ViewDonor from '../pages/Dashboard/Donor/ViewDonor'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index : true,
        element: <Home />,
      },
      {
        path: '/donations-requests',
        element: <Donation></Donation>,
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>,
      },
      {
        path: '/funding',
        element: <Funding></Funding>,
      },
      {
        path: '/plant/:id',
        element: <PlantDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
         index: true,
        element: (
          <PrivateRoute>
           <StatisticRoute></StatisticRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-users',
        element: (<PrivateRoute><AllUsers></AllUsers></PrivateRoute>),
      },
      {
        path: 'all-blood-donation-request',
        element : (
          <PrivateRoute>
            <BloodDonationRequest></BloodDonationRequest>
          </PrivateRoute>
        ),
      },
      {
        path: 'statistic',
        element : (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: 'content-management',
        element: (
          <PrivateRoute>
           <ContentManagement></ContentManagement>
          </PrivateRoute>
        ),
      },
      // {
      //   path: 'add-blog',
      //   element: (
      //     <PrivateRoute>
      //      <AddBlog></AddBlog>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-donation-requests',
        element: (
          <PrivateRoute>
           <MyDonationRequests></MyDonationRequests>
          </PrivateRoute>
        ),
      },
      {
        path: 'create-donation-requests',
        element: (
          <PrivateRoute>
           <CreateDonationRequest></CreateDonationRequest>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/edit-donation/:id',
        element: (
          <PrivateRoute>
           <EditDonor></EditDonor>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/view-donation/:id',
        element: (
          <PrivateRoute>
          <ViewDonor></ViewDonor>
          </PrivateRoute>
        ),
      },
      
    ],
  },
])
