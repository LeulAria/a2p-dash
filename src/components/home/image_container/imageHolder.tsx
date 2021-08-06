import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const useStyles = makeStyles(() => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    height: "100%",
    maxWidth: "400px",
    margin: "auto",
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
          <img src={Image} alt="title" />
        </ImageListItem>
      </ImageList>
    </div>
  );
}
