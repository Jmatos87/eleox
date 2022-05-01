import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import COLORS from "../constants/colors.js";

import { css } from "@emotion/css";
import { styled } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PersonCard(props) {
  const { avatar, first_name, last_name, email, id, job_title } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fullName = `${first_name} ${last_name}`;

  return (
    <Card md={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="150"
        sx={{ width: "150px !important", margin: "0px auto" }}
        image={avatar}
        alt={fullName}
      /> */}
      <CardHeader
        avatar={<Avatar alt={fullName} src={avatar} />}
        action={
          <IconButton aria-label="options" color="primary">
            <MoreVertIcon />
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
          onClick={handleExpandClick}
          size="small"
        >
          Comments
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
