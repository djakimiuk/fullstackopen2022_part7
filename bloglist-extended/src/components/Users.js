import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  const users = result.data;

  if (result.isLoading) {
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
              <td>{user?.name}</td>
              <td>{user?.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
