import { useEffect } from "react";
import { Navbar, ViewProducts } from "../../components";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/admin/adminActions";

function AdminHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <Navbar admin={true} />
      <ViewProducts admin={true} />
    </div>
  );
}

export default AdminHome;
