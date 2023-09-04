import React from "react";
import ViewError from "./ViewError";

const NoContent = () => {
    return (
        <ViewError
            title="403"
            text="Hmm, seems like you don't have permission to visit this
                page"
        />
    );
};

export default NoContent;
