import { useState } from "react";
import blogs from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useNotify } from "../NotificationContext";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const newBlogMutation = useMutation({
    mutationFn: blogs.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notify({
        body: `a new blog ${newBlog.title} added`,
        error: false,
      });
    },
    onError: (error) => {
      notify({ body: error.message, error: true });
    },
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const blog = {
      author: author,
      title: title,
      url: url,
    };

    newBlogMutation.mutate(blog);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            id="title-input"
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="author-input"
            onChange={(event) => setAuthor(event.target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            id="url-input"
            onChange={(event) => setUrl(event.target.value)}
          ></input>
        </div>
        <button type="submit" id="addBlog-button">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
