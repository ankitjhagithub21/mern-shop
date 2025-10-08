import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext' // add this import
import NotFoundPage from './pages/NotFoundPage'

function App() {
  

  const router = createBrowserRouter([
    {
      path:"/",
      element:<>
      <Navbar/>
      <HomePage/>
      </>
    },
     {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/register",
      element:<RegisterPage/>
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
