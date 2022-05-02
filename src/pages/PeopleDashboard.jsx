import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AlertMessage from "../components/AlertMessage";
import PersonCard from "../components/PersonCard";
import NavBar from "../components/NavBar";

export default function PeopleDashboardPage() {
  const [authorized, setAuthorized] = useState(false);
  const [peopleList, setPeopleList] = useState([]);
  const [status, setStatusBase] = React.useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("umbrage-access-token");
  const accessTime = new Date(localStorage.getItem("umbrage-access-time"));

  useEffect(() => {
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    var over24Hours = now - accessTime > oneDay;

    if (!(accessToken && accessTime) || over24Hours) {
      navigate("../log-in");
    } else {
      setAuthorized(true);
    }
  }, [accessToken, accessTime, setAuthorized]);

  useEffect(() => {
    if (authorized) {
      fetch("http://umbrage-interview-api.herokuapp.com/people", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function (response) {
          const { people } = response;

          setPeopleList(people);
        })
        .catch(function (error) {
          // Need to communicate to user that an error has ocurred

          setStatusBase({ msg: error.message, key: Math.random() });
          if (error.message === "Unauthorized") {
            navigate("../log-in");
          }
        });
    }
  }, [authorized]);

  return (
    <Container component="main">
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NavBar />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          marginBottom: 5,
        }}
      >
        {peopleList.map((person, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PersonCard
                {...person}
                accessToken={accessToken}
                setPeopleList={setPeopleList}
                peopleList={peopleList}
                setStatusBase={setStatusBase}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
