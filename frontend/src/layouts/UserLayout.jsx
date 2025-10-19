import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useCartStore } from '../store/useCartStore';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const UserLayout = ({ children }) => {
  const fetchCart = useCartStore(state => state.fetchCart);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
};

export default UserLayout;
