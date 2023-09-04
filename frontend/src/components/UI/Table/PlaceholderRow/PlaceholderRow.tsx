import React, { FC } from "react";
import { PlaceholderRowProps } from "../../../../../types/types.js";

const UsersPlaceholderRow: FC<PlaceholderRowProps> = ({ index, lastRow }) => {
    const classes = lastRow ? "p-4" : "p-4 border-b border-blue-gray-50";
    return (
        <tr key={index} className={classes}>
            <td className="animate-pulse p-4 w-1/3">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-28"></div>
                        <div className="h-3 bg-gray-light dark:bg-dark-neutral rounded w-32 mt-2"></div>
                    </div>
                </div>
            </td>
            <td className="animate-pulse p-4 w-1/5">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-32"></div>
            </td>
            <td className="animate-pulse p-4 w-1/5">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-40"></div>
            </td>
            <td className="animate-pulse p-4 w-1/5">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-40"></div>
            </td>
            <td className="animate-pulse p-4 w-1/5">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-10"></div>
            </td>
        </tr>
    );
};

export default UsersPlaceholderRow;
