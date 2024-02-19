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

  return (
    <>
      <Notification />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
