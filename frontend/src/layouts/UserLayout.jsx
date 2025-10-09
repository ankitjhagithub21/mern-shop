import Navbar from '../components/Navbar';

const UserLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default UserLayout;
