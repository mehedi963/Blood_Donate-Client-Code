import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/DonationDetails/DonationDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
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
import AddBlog from '../pages/Dashboard/Admin/AddBlog'
import SearchDonor from '../components/Home/SearchDonar'
import DonationDetails from '../pages/DonationDetails/DonationDetails'
import BlogsDetails from '../components/Home/BlogsDetails'



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
        path: '/donation',
        element: <Donation></Donation>,
      },
      {
        path: '/donation/:id',
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
      },
      {
        path: '/search-donors',
        element: <SearchDonor></SearchDonor>,
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>,
      },
      {
        path: '/blogs/:id',
        element: <BlogsDetails></BlogsDetails>,
      },
      {
        path: '/funding',
        element: <Funding></Funding>,
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
      {
        path: 'add-blog',
        element: (
          <PrivateRoute>
           <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
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
