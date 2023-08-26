import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

export interface ViewErrorProps {
    title: string;
    text?: string;
}

const ViewError: FC<ViewErrorProps> = ({ title, text }) => {
    const { user } = useStateContext();
    const linkClasses: string =
        "text-dark-accent drop-shadow-lg p-4 bg-neutral rounded transition-all hover:bg-accent hover:text-neutral";

    return (
        <div className="bg-gradient-to-r from-purple from-10% via-primary via-30% to-pink to-90% h-screen flex-center items-center flex-col">
            <div className="mb-4 text-[54px] text-neutral">{title}</div>
            {text ? (
                <div className="mb-4 text-sm text-neutral">{text}</div>
            ) : null}
            <div className="flex">
                {user ? null : (
                    <Link to="/login" className={`mr-4 ${linkClasses}`}>
                        Log in
                    </Link>
                )}
                <Link to="/landing" className={linkClasses}>
                    Go home
                </Link>
            </div>
        </div>
    );
};

export default ViewError;
