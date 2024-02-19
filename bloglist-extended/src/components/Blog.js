import { useState } from "react";
import blogs from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../NotificationContext";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog?.likes);

  const queryClient = useQueryClient();
  const notify = useNotify();
  const showWhenVisible = { display: visible ? "" : "none" };
  const showDeleteBtn = {
    display: blog?.user.username === user?.username ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogs.modify,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
      notify({
        body: `blog ${updatedBlog.title} voted`,
        error: false,
      });
    },
    onError: (error) => {
      notify({ body: error.message, error: true });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogs.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        body: `blog deleted`,
        error: false,
      });
    },
    onError: (error) => {
      notify({ body: error.message, error: true });
    },
  });

  const visibilityHandler = () => {
    setVisible(!visible);
  };

  const increaseLikes = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const modifiedBlog = { ...blog, likes: updatedLikes };
    updateBlogMutation.mutateAsync(modifiedBlog);
  };

  const deleteHandler = () => {
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
    }
    return;
  };

  return (
    <div style={blogStyle} className="blog">
      <span className="titleAndAuthor">
        {blog?.title} {blog?.author}
      </span>
      <button onClick={visibilityHandler}>{visible ? "hide" : "view"}</button>
      <br></br>
      <div style={showWhenVisible}>
        <a href={blog?.url}>{blog?.url}</a>
        <br></br>
        <span className="likes">{likes}</span>
        <button onClick={increaseLikes} id="like-button">
          like
        </button>
        <br></br>
        <span className="blogUser">{blog?.user.name}</span>
        <br></br>
        <button
          id="remove-button"
          style={showDeleteBtn}
          onClick={deleteHandler}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
