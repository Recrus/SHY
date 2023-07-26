import React from "react";

const PlaceholderRow = ({ index, lastRow }) => {
    const classes = lastRow ? "p-4" : "p-4 border-b border-blue-gray-50";
    return (
        <tr key={index} className={classes}>
            <td className="animate-pulse p-4 w-[476px]">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-28"></div>
                        <div className="h-3 bg-gray-light dark:bg-dark-neutral rounded w-32 mt-2"></div>
                    </div>
                </div>
            </td>
            <td className="animate-pulse p-4 w-[293px]">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-1/4"></div>
            </td>
            <td className="animate-pulse p-4 w-[267px]">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-1/4"></div>
            </td>
            <td className="animate-pulse p-4 w-[244px]">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-1/4"></div>
            </td>
            <td className="animate-pulse p-4 w-[132px]">
                <div className="h-4 bg-gray-light dark:bg-dark-neutral rounded w-1/4"></div>
            </td>
        </tr>
    );
};

export default PlaceholderRow;
