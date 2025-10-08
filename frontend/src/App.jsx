
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'

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
  ])

  return (
  <>
   <RouterProvider router={router}/>
   <Toaster/>
   </>
  )
}

export default App
