import React, { ChangeEvent, FC } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline/index.js";
import { CardTableHeaderProps } from "../../../../../types/types";

const CardTableHeader: FC<CardTableHeaderProps> = ({
    title,
    subTitle,
    search,
    setSearch,
    createButton,
}) => {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
            <div className="text-center md:text-left">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-theme"
                >
                    {title}
                </Typography>
                <Typography color="gray" className="mt-1 text-primary">
                    {subTitle}
                </Typography>
            </div>
            <div className="flex flex-col items-center md:block">
                {createButton}
                <div className="mt-6">
                    <div className="w-full md:w-72">
                        <Input
                            crossOrigin="anonymous"
                            label="Search"
                            color="indigo"
                            labelProps={{
                                className: "!text-silver",
                            }}
                            icon={
                                <MagnifyingGlassIcon className="h-5 w-5 text-silver" />
                            }
                            className="text-theme"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardTableHeader;
