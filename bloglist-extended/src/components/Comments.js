import { TextField, Button } from "@mui/material";
import blogService from "../services/blogs";
import { useEffect, useState } from "react";

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedComments = await blogService.getComments(blog?.id);
        setComments(fetchedComments);
        console.log(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [blog?.id]);

  if (!comments) {
    return <p>loading data...</p>;
  }

  const handleAddComment = async (event) => {
    event.preventDefault();
    const newComment = {
      comment: comment,
    };
    await blogService.comment(newComment, blog.id);
    setComments([...comments, newComment]);
    setComment("");
  };
  return (
    <>
      <h2>comments</h2>
      <form onSubmit={handleAddComment}>
        <TextField
          label="Comment"
          variant="outlined"
          margin="normal"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add comment
        </Button>
      </form>
      <ul>
        {comments.map((e) => (
          <li key={e.id}>{e.comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
