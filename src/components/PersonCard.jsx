import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import COLORS from "../constants/colors.js";
import CircularProgress from "@mui/material/CircularProgress";

import { css } from "@emotion/css";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const modalContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonContainer = {
  display: "flex",
  marginTop: 4,
  justifyContent: "space-between",
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
};

export default function PersonCard(props) {
  const {
    avatar,
    first_name,
    last_name,
    email,
    id,
    job_title,
    accessToken,
    peopleList,
    setPeopleList,
    setStatusBase,
  } = props;
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(null);

  const [comments, setComments] = useState([]);

  const handleExpandCommentsClick = () => {
    setExpanded(!expanded);
    if (!comments.length) {
      setCommentsLoading(true);
      fetch(`http://umbrage-interview-api.herokuapp.com/people/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          setCommentsLoading(false);

          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          const {
            person: { comments },
          } = response;
          const formatComments = comments.map((obj) => obj.comment);
          setComments(formatComments);
        })
        .catch(function (error) {
          // Need to communicate to user that an error has ocurred
          setStatusBase({ msg: error.message, key: Math.random() });
          if (error.message === "Unauthorized") {
            navigate("../log-in");
          }
        });
    }
  };

  const handleDeleteContact = () => {
    setModalOpen(false);
    fetch(`http://umbrage-interview-api.herokuapp.com/people/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (response) {
        const newPeopleList = peopleList.filter((person) => person.id !== id);
        setPeopleList(newPeopleList);
      })
      .catch(function (error) {
        // Need to communicate to user that an error has ocurred
        setStatusBase({ msg: error.message, key: Math.random() });
        if (error.message === "Unauthorized") {
          navigate("../log-in");
        }
      });
  };

  const fullName = `${first_name} ${last_name}`;

  return (
    <Card md={{ maxWidth: 345, padding: 1 }}>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalContainer}>
          <Typography id="modal-modal-title" variant="p" component="h2">
            Are you sure you want to delete {fullName}?
          </Typography>
          <Box sx={buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteContact}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <CardHeader
        avatar={<Avatar alt={fullName} src={avatar} />}
        action={
          <IconButton
            aria-label="options"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        }
        title={fullName}
        subheader={
          <Tooltip title={job_title}>
            <Typography
              className={css`
                overflow: hidden;
                textoverflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              `}
            >
              {job_title}
            </Typography>
          </Tooltip>
        }
      />
      <CardActions disableSpacing>
        <IconButton aria-label="email" color="primary" href={`mailto:${email}`}>
          <EmailIcon />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: "auto", backgroundColor: COLORS.primary }}
          onClick={handleExpandCommentsClick}
          size="small"
        >
          Comments
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {commentsLoading && (
            <Box sx={loadingContainer}>
              <CircularProgress />
            </Box>
          )}
          {!commentsLoading && comments.length === 0 && (
            <CardMedia
              component="img"
              height="150"
              sx={{ width: "150px !important", margin: "0px auto" }}
              image="https://c.tenor.com/ZvXGCIW2KjkAAAAM/nothing-to-see-here-im-out.gif"
              alt="No results nothing to see here"
            />
          )}
          {comments.map((comment) => (
            <Typography paragraph>{comment}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
