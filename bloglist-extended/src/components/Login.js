import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "../UserContext";
import { TextField, Button, Paper, Typography } from "@mui/material";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        console.log("inside initializer");
        const loggedUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedUserJSON) {
          const parsedUser = JSON.parse(loggedUserJSON);
          userDispatch({ type: "setUser", payload: parsedUser });
          console.log("before set token");
          await blogService.setToken(parsedUser.token);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };
    initializeUser();
  }, [userDispatch]);

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
      // Handle login error
      console.error("Login failed:", exception);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom></Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </StyledPaper>
  );
};

export default Login;
