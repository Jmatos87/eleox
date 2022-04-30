import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";

import AlertMessage from "../components/AlertMessage";

const renderPerson = (person) => {
  const { avatar, first_name, last_name, email, job_title, comments } = person;

  return (
    <Card>
      <img src={avatar} />
      <h3>
        {first_name} {last_name}
      </h3>
      <p>{job_title}</p>
      <p>{email}</p>

      <h2>Comments</h2>

      {comments.map((commentObj, index) => {
        const { comment } = commentObj;
        return <div key={index}>{comment}</div>;
      })}
    </Card>
  );
};

export default function PersonDetailView() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const [person, setPerson] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatusBase] = React.useState("");

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
    fetch(`http://umbrage-interview-api.herokuapp.com/people/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (response) {
        const { person } = response;
        setPerson(person);
      })
      .catch(function (error) {
        // Need to communicate to user that an error has ocurred
        setStatusBase({ msg: error.message, key: Math.random() });
      });
  }, []);

  console.log(person);

  return (
    <div>
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
      {person.id && renderPerson(person)}
    </div>
  );
}
