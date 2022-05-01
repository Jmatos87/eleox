import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AlertMessage from "../components/AlertMessage";

export default function SignIn() {
  const localStorageUsername = localStorage.getItem("umbrage-username") || "";
  const [saveUsername, setSaveUsername] = useState(false);
  const [status, setStatusBase] = useState("");
  const navigate = useNavigate();

  const logIn = (username, password) => {
    fetch("http://umbrage-interview-api.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (response) {
        const { access_token } = response;

        // Need to store username for convenience and access token for return visits.
        localStorage.setItem("umbrage-username", username);
        localStorage.setItem("umbrage-access-token", access_token);
        localStorage.setItem("umbrage-access-time", new Date());
        navigate("../people-dashboard");
      })
      .catch(function (error) {
        // Need to communicate to user that an error has ocurred
        setStatusBase({ msg: error.message, key: Math.random() });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const accessToken = logIn(email, password, saveUsername);
    console.log(accessToken);
  };

  return (
    <Container component="main" maxWidth="xs">
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          background: "white !important",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome to Eleox!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            defaultValue={localStorageUsername}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={saveUsername}
                color="primary"
                onClick={() => setSaveUsername(!saveUsername)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
