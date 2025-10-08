
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  LogOut,
  User2,
  Settings2
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <div className="mb-8 flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/add-product">
              <PackagePlus className="w-5 h-5 mr-2" />
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <Boxes className="w-5 h-5 mr-2" />
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <User2 className="w-5 h-5 mr-2" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/settings">
              <Settings2 className="w-5 h-5 mr-2" />
              Settings
            </Link>
          </li>
        </ul>
        <div className="mt-auto pt-8">
          <button className="btn btn-outline btn-error w-full flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
