import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = ({children}) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {children}
        {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
       
      </div>
      <Sidebar/>
    </div>
  )
}

export default Dashboard