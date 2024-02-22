import { TableCell, TableRow,  } from "@mui/material";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog?.url}</Link>
      </TableCell>
      <TableCell>{blog.user.name}</TableCell>
    </TableRow>
  );
};

export default Blog;
