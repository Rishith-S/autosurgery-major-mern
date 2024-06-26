import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../features/userDetailSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Image from "../assets/bg.png";
import { CssTextField } from "./CssTextField";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post("/auth/login", { username, password });
      dispatch(
        setUserDetails({
          id: response.data.id,
          username,
          accesstoken: response.data.accesstoken,
        })
      );
      localStorage.setItem("name",username)
      navigate(from ? from : "/home", { replace: true });
    } catch (error) {
      if (!error?.response) {
        alert("No response from the server");
      } else if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else if (error.response?.status === 401) {
        alert(error.response.data.message);
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        borderRadius: "10px",
      }}
    >
      <Card
        sx={{
          backgroundColor: "rgba(230, 230, 249, 0.4)",
          backdropFilter: "blur(75px) saturate(80%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minWidth: "50vh",
          minHeight: "50vh",
          boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.37)",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h1 style={{color:"rgba(0, 0, 0)"}}>Login</h1>
            <CssTextField
              label="Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingBottom: "3vh", width: "30vh" }}
            />
            <br></br>
            <CssTextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingBottom: "2vh", width: "30vh" }}
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: styles.notchedOutline
                }
              }}
            />
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "black" }}
              >
                Login
              </Button>
            </CardActions>
            <Typography variant="h7">Don't have an account ? </Typography>
            <Button style={{ color: "black" }} to={"/signup"} component={Link}>
              signup
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
