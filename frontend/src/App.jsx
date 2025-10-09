import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import { AuthProvider, useAuth } from './context/AuthContext' // add this import
import NotFoundPage from './pages/NotFoundPage'


import AddProduct from './admin/AddProduct'
import AdminProducts from './admin/AdminProducts'
import AdminDashboard from './admin/AdminDashboard'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import { Navigate, Outlet } from 'react-router-dom'
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <HomePage/>;
  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout><HomePage/></UserLayout>
    },
    {
      path: "/cart",
      element: <UserLayout><CartPage/></UserLayout>
    },
    {
      path: "/product/:id",
      element: <UserLayout><ProductDetails/></UserLayout>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/register",
      element: <RegisterPage/>
    },
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          path: "",
          element: <AdminLayout><AdminDashboard/></AdminLayout>
        },
        {
          path: "dashboard",
          element: <AdminLayout><AdminDashboard/></AdminLayout>
        },
        {
          path: "add-product",
          element: <AdminLayout><AddProduct/></AdminLayout>
        },
        {
          path: "products",
          element: <AdminLayout><AdminProducts/></AdminLayout>
        }
      ]
    },
    {
      path: "*",
      element: <NotFoundPage/>
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster/>
    </AuthProvider>
  )
}

export default App