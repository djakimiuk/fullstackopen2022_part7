import { useState } from "react";
import blogs from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../NotificationContext";
import { useNavigate } from "react-router-dom";

const BlogView = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog?.likes);

  const queryClient = useQueryClient();
  const notify = useNotify();
  const navigate = useNavigate();
  const showDeleteBtn = {
    display: blog?.user.username === user?.username ? "" : "none",
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

  const increaseLikes = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const modifiedBlog = { ...blog, likes: updatedLikes };
    updateBlogMutation.mutateAsync(modifiedBlog);
  };

  const deleteHandler = () => {
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
      navigate('/')
    }
    return;
  };

  if (!user) {
    return <p>loading data...</p>;
  }

  return (
    <>
      <h2>{blog?.title}</h2>
      <a href={blog?.url}>{blog?.url}</a>
      <br></br>
      <span className="likes">{likes}</span>
      <button onClick={increaseLikes} id="like-button">
        like
      </button>
      <br></br>
      <span className="blogUser">added by {blog?.user.name}</span>
      <br></br>
      <button id="remove-button" style={showDeleteBtn} onClick={deleteHandler}>
        remove
      </button>
    </>
  );
};

export default BlogView;
