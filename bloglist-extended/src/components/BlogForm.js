import { useState } from "react";
import blogs from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "../NotificationContext";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  width: "100%",
  margin: "auto",
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

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
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom></Typography>
      <form onSubmit={addBlog}>
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          value={title}
          name="Title"
          id="title-input"
          onChange={(event) => setTitle(event.target.value)}
        ></TextField>

        <TextField
          label="Author"
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          value={author}
          name="Author"
          id="author-input"
          onChange={(event) => setAuthor(event.target.value)}
        ></TextField>

        <TextField
          label="Url"
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          value={url}
          name="url"
          id="url-input"
          onChange={(event) => setUrl(event.target.value)}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          id="addBlog-button"
        >
          create
        </Button>
      </form>
    </StyledPaper>
  );
};

export default BlogForm;
