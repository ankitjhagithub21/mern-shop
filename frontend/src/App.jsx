import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext' // add this import
import NotFoundPage from './pages/NotFoundPage'

import Dashboard from './admin/Dashboard'
import AddProduct from './admin/AddProduct'
import AdminProducts from './admin/AdminProducts'
import AdminDashboard from './admin/AdminDashboard'
import ProductDetails from './pages/ProductDetails'

function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar/>
        <HomePage/>
      </>
    },
      {
      path: "/product/:id",
      element: <>
        <Navbar/>
        <ProductDetails/>
      </>
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
      element: <Dashboard/>,
      children: [
         {
          path: "",
          element: <AdminDashboard/>
        },
        {
          path: "dashboard",
          element: <AdminDashboard/>
        },
        {
          path: "add-product",
          element: <AddProduct/>
        },
        {
          path: "products",
          element: <AdminProducts/>
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
