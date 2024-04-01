import { Button } from "@material-ui/core";
import React from "react";
import { RICK_ROLLED } from "../config";

const Popups = () => {
  const RickRolled = () => {
    window.location.href = RICK_ROLLED;
  };
  return (
    <div>
      <Button
        onClick={() => RickRolled()}
        variant="outlined"
        className="sidebar__tweet button"
        fullWidth
      >
        Tweet
      </Button>
    </div>
  );
};
export default Popups;
