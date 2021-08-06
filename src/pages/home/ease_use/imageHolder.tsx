import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      maxWidth: "350px",
      margin: "auto",
    },
  },
  gridList: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}));

export default function ImageGridList({ Image }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight="auto" className={classes.gridList} cols={1}>
        <ImageListItem cols={1}>
          <img src={Image} alt="title" width="100%" height="100%" />
        </ImageListItem>
      </ImageList>
    </div>
  );
}
