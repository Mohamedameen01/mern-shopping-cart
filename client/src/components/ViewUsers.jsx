import { useSelector } from "react-redux";

function ViewUsers() {
  const users = useSelector((state) => state.admin);
  console.log(users);

  return (
    <section>
      <div className="container mt-5">
        <div className="table-responsive m-3">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item,index) => (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>{item?._id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ViewUsers;
