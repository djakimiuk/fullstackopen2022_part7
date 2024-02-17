import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotify } from "./NotificationContext";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const notify = useNotify();
  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const blogs = result.data;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify({ body: "Wrong credentials", error: true });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  const blogsList = (user) => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{" "}
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  );

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <>
      <Notification />
      {user === null && loginForm()}
      {user !== null && blogsList(user)}
    </>
  );
};

export default App;
