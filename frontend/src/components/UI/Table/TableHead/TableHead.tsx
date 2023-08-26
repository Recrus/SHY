import React, { FC } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import { TableHeadProps } from "../../../../../types/types";

const TableHead: FC<TableHeadProps> = ({
    sortKey,
    sortDirection,
    setSortDirection,
    setSortKey,
    TABLE_HEAD,
    sortKeys,
}) => {
    const handleSort = (key: string) => {
        if (sortKey === key && sortDirection === "asc") {
            setSortDirection("desc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    return (
        <thead>
            <tr>
                {TABLE_HEAD.map((head, index) => (
                    <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 p-4 transition-colors bg-neutral dark:bg-dark-neutral"
                        onClick={() => handleSort(sortKeys[head])}
                    >
                        <Typography
                            variant="small"
                            className="flex items-center justify-between gap-2 font-normal opacity-70 text-theme text-base"
                        >
                            {head}
                            {index !== TABLE_HEAD.length - 1 && (
                                <ChevronUpDownIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />
                            )}
                        </Typography>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
