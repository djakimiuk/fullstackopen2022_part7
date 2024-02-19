import { useUserDispatch, useUserValue } from "../UserContext";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: "setUser", payload: parsedUser });
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      userDispatch({ type: "setUser", payload: user });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      notify({ body: "Wrong credentials", error: true });
    }
  };

  return (

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
};

export default Login;
