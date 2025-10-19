import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from './components/loading/LoadingSpinner'

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const OrderFailed = lazy(() => import('./pages/OrderFailed'))

// Admin components
const AddProduct = lazy(() => import('./admin/AddProduct'))
const AdminProducts = lazy(() => import('./admin/AdminProducts'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'))
const AdminOrders = lazy(() => import('./admin/AdminOrders'))

// Layouts
const UserLayout = lazy(() => import('./layouts/UserLayout'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))



function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}

function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><HomePage/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/checkout",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><CheckoutPage/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/cart",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <UserLayout><CartPage/></UserLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: "/product/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><ProductDetails/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/order/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><OrderDetails/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/order-success",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><OrderSuccess/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/order-cacel",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <UserLayout><OrderFailed/></UserLayout>
        </Suspense>
      )
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <LoginPage/>
        </Suspense>
      )
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <RegisterPage/>
        </Suspense>
      )
    },
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout><AdminDashboard/></AdminLayout>
            </Suspense>
          )
        },
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout><AdminDashboard/></AdminLayout>
            </Suspense>
          )
        },
        {
          path: "add-product",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout><AddProduct/></AdminLayout>
            </Suspense>
          )
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout><AdminProducts/></AdminLayout>
            </Suspense>
          )
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLayout><AdminOrders/></AdminLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <NotFoundPage/>
        </Suspense>
      )
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