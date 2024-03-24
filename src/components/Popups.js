import { Button } from "@material-ui/core";
import React from "react";

const Popups = () => {
    const RickRolled = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
