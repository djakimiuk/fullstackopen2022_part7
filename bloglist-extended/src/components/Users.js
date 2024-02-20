import { Link } from "react-router-dom";

const Users = ({users}) => {

  if (!users) {
    return <p>loading data...</p>;
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user?.name}</Link>
              </td>
              <td>{user?.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
