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
import CheckoutPage from './pages/CheckoutPage'
import OrderDetails from './pages/OrderDetails'
import OrderSuccess from './pages/OrderSuccess'
import OrderFailed from './pages/OrderFailed'
import AdminOrders from './admin/AdminOrders'

function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <HomePage />;
  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}

function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <HomePage />;
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout><HomePage/></UserLayout>
    },
      {
      path: "/checkout",
      element: <UserLayout><CheckoutPage/></UserLayout>
    },
    {
      path: "/cart",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <UserLayout><CartPage/></UserLayout>
        }
      ]
    },
    {
      path: "/product/:id",
      element: <UserLayout><ProductDetails/></UserLayout>
    },
    {
      path: "/order/:id",
      element: <UserLayout><OrderDetails/></UserLayout>
    },
     {
      path: "/order-success",
      element: <UserLayout><OrderSuccess/></UserLayout>
    },
     {
      path: "/order-failed",
      element: <UserLayout><OrderFailed/></UserLayout>
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
        },
         {
          path: "orders",
          element: <AdminLayout><AdminOrders/></AdminLayout>
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