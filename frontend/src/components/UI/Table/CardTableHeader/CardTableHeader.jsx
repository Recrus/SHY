import React from "react";
import { Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline/index.js";

const CardTableHeader = ({
    title,
    subTitle,
    search,
    setSearch,
    createButton,
}) => {
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="flex items-center justify-between gap-8">
            <div>
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="dark:text-neutral font-primary"
                >
                    {title}
                </Typography>
                <Typography
                    color="gray"
                    className="mt-1 font-primary text-primary dark:text-neutral"
                >
                    {subTitle}
                </Typography>
            </div>
            <div>
                {createButton}
                <div className="mt-6">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            labelProps={{
                                className: "!text-primary !text-[12px]",
                            }}
                            icon={
                                <MagnifyingGlassIcon className="h-5 w-5 text-primary" />
                            }
                            className="text-primary font-primary"
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
