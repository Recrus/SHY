import React from "react";
import { Skeleton } from "@mui/material";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const TheExamSkeleton = () => {
    return (
        <Card className="mt-6 w-3/4 dark:bg-dark-accent">
            <CardBody className="flex-between items-center text-theme">
                <div className="max-w-[90%]">
                    <Typography variant="h5" className="mb-2">
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={210}
                            height={40}
                        />
                    </Typography>
                    <Typography>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            width={410}
                            height={30}
                        />
                    </Typography>
                </div>
                <div
                    className={`w-14 h-14 rounded-full text-neutral flex-center items-center`}
                >
                    <Skeleton
                        variant="circular"
                        animation="wave"
                        width={50}
                        height={50}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default TheExamSkeleton;
