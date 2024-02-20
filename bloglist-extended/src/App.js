import Notification from "./components/Notification";
import { useNotify } from "./NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Users from "./components/Users";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";

const App = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const match = useMatch("/blogs/:id");

  const blogs = result.data;

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const userDispatch = useUserDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    userDispatch({ type: "clearUser" });
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
        <Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? (
              <Blogs blogs={blogs} user={user} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
