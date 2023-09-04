import React, { FC } from "react";

interface ErrorMessageProps {
    error: string | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
    return error && <div className="text-red-500 text-xs mt-1">{error}</div>;
};

export default ErrorMessage;
