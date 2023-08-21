import React from "react";
import { Skeleton } from "@mui/material";
import { ListItem, ListItemSuffix } from "@material-tailwind/react";

export interface QuestionEditSkeletonProps {
    length: number;
    index: number;
}

const QuestionEditSkeleton: React.FC<QuestionEditSkeletonProps> = ({
    length,
    index,
}) => {
    const isLast = index === length - 1;

    return (
        <div>
            <ListItem>
                <div className="flex">
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={200}
                        height={41}
                        className="mr-2"
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={900}
                        height={41}
                    />
                </div>
                <ListItemSuffix>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={140}
                        height={41}
                    />
                </ListItemSuffix>
            </ListItem>
        </div>
    );
};

export default QuestionEditSkeleton;
