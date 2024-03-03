import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const modify = async (modifiedBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${modifiedBlog.id}`,
    modifiedBlog,
    config,
  );
  return response.data;
};

const deleteItem = async (blogToDelete) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.delete(
      `${baseUrl}/${blogToDelete.id}`,
      config,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete blog: ${error.message}`);
  }
};

const comment = async (newComment, blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    newComment,
    config,
  );
  return response.data;
};

const getComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`);
  return response.data;
};

export default {
  getAll,
  setToken,
  create,
  modify,
  deleteItem,
  comment,
  getComments,
};
