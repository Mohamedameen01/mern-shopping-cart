import { Navbar, Products } from '../../components';

function AdminHome() {
  return (
    <div>
      <Navbar admin={true} />
      <Products admin={true} />
    </div>
  )
}

export default AdminHome;