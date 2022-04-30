import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import AlertMessage from "../components/AlertMessage";

export default function PeopleDashboardPage() {
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
    }
  }, [accessToken, accessTime]);

  useEffect(() => {
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
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          People Dashboard!!!
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {peopleList.map((person, index) => {
            const {
              avatar,
              first_name,
              last_name,
              email,
              id,
              job_title,
            } = person;
            return (
              <div key={index}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => navigate(`../person/${id}`)}
                >
                  <ListItemAvatar>
                    <Avatar alt={`${first_name} ${last_name}`} src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${first_name} ${last_name}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {job_title}
                        </Typography>
                        {email}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < peopleList.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : null}
              </div>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}
