import React from "react";
import { LinearProgress } from "@material-ui/core";
import {
  GridOverlay,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";

// const useStyles = makeStyles(() => createStyles({
//   toolBarButton: {
//     content: 'filter',
//     color: 'yellow !important',
//     border: '1px solid #fff',
//     borderRadius: 6,
//   },
// }));

function CustomLoadingOverlay(): JSX.Element {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export const CustomLoading = (): JSX.Element => (
  <div style={{ position: "absolute", top: 0, width: "100%" }}>
    <LinearProgress />
  </div>
);

export function CustomToolbar(): JSX.Element {
  // const classes = useStyles();

  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default CustomLoadingOverlay;
