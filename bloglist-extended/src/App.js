import Notification from "./components/Notification";
import { useUserDispatch } from "./UserContext";
import {
  Routes,
  Route,
  Navigate,
  useMatch,
  useNavigate,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogView from "./components/BlogView";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Users from "./components/Users";
import User from "./components/User";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const blogsResult = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const blogMatch = useMatch("/blogs/:id");

  const blogs = blogsResult.data;

  const blog =
    blogMatch && blogs
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null;

  const userMatch = useMatch("/users/:id");

  const usersResult = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  const users = usersResult.data;

  const chosenUser =
    userMatch && users
      ? users.find((user) => user.id === userMatch.params.id)
      : null;

  const userDispatch = useUserDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    userDispatch({ type: "clearUser" });
    navigate("/");
  };

  return (
    <>
      <Notification />
      {user ? (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in{" "}
            <p>
              <button id="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </p>
          </div>
        </>
      ) : null}
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <BlogView blog={blog} user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/blogs"
          element={
            user ? (
              <Blogs blogs={blogs} user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? <Blogs blogs={blogs} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users/:id"
          element={
            user ? <User user={chosenUser} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users"
          element={
            user ? <Users users={users} /> : <Navigate replace to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
