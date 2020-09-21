import React from "react";
import styles from "./CVcard.module.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CV1 from '../../Images/CV1.jpg';
import CV2 from '../../Images/CV2.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function CVcard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
          <img src={CV1} />
      </CardContent>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>
          <img src={CV2} />
      </CardContent>
      </Collapse>
    </Card>
  );
}

export default CVcard;
