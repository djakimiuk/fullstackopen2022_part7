import { TableCell, TableRow,  } from "@mui/material";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog?.id}`}>{blog?.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  );
};

export default Blog;
