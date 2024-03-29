import React, { FC } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { PaginationProps } from "../../../../../types/types";

const Pagination: FC<PaginationProps> = ({
    currentPage,
    setPage,
    totalPages,
}) => {
    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="flex-between items-center border-t border-blue-gray-50 p-4">
            <Typography
                variant="small"
                color="blue-gray"
                className="font-normal text-theme"
            >
                Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
                <Button
                    variant="outlined"
                    color="indigo"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="outlined"
                    color="indigo"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={totalPages === currentPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
