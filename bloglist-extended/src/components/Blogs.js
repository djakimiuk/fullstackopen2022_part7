import { useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Blogs = ({ user, blogs }) => {
  const blogFormRef = useRef();

  if (!blogs) {
    return <div>loading data...</div>;
  }

  return (
    <div>
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
