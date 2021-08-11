import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
// import ImageList from "@material-ui/core/ImageList";
// import ImageListItem from "@material-ui/core/ImageListItem";
import SMSManager from "../../../assets/images/sms_made_easy_img.png";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
    },
  },
  gridList: {
    width: "100%",
    height: "100%",
    padding: "3rem 0",
  },
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={SMSManager} alt="title" width="100%" />
    </div>
  );
}
