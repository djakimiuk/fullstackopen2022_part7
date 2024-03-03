import { useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Table, TableBody } from "@mui/material";

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef();

  if (!blogs) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <Table>
        <TableBody>
          {blogs.map((blog) => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Blogs;
