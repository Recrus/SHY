import React from "react";
import ViewError from "./ViewError";

function NoContent() {
    return (
        <ViewError
            title="404"
            text="Hmm, looks like this page doesn't exist."
        />
    );
}

export default NoContent;
