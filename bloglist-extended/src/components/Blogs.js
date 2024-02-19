import { useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useUserDispatch } from "../UserContext";

const Blogs = ({ user, blogs }) => {
  const blogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    userDispatch({ type: "clearUser" });
  };

  if (!blogs) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in{" "}
        <p>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </p>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
