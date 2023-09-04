import React, { FC } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Chip,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Test } from "../../../../types/types";
import { useStateContext } from "../../../context/StateContext";

export interface TestCardProps {
    test: Test;
}

const TestCard: FC<TestCardProps> = ({ test }) => {
    const { user } = useStateContext();

    return (
        <Card className="w-72 sm:w-96 dark:bg-dark-accent justify-between">
            <CardBody className="pb-2">
                <div className="flex-between items-center mb-2">
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="text-theme mr-2"
                    >
                        {test.name}
                    </Typography>
                    {user?.role_id === 3 ? (
                        test.is_passed !== null ? (
                            test.is_passed ? (
                                <Chip
                                    value="Passed"
                                    variant="outlined"
                                    color="green"
                                    className="text-sm"
                                />
                            ) : (
                                <Chip
                                    value="Failed"
                                    variant="outlined"
                                    color="red"
                                    className="text-sm"
                                />
                            )
                        ) : (
                            <Chip
                                value="Not Done"
                                variant="outlined"
                                color="gray"
                                className="text-sm"
                            />
                        )
                    ) : null}
                </div>
                <Typography className="text-theme">
                    {test.description}
                </Typography>
            </CardBody>
            <CardFooter className="p-2">
                {(user?.role_id === 3 && test.is_passed === null) ||
                user?.role_id === 1 ? (
                    <Link
                        to={`${test.id}`}
                        state={{ test: test }}
                        className="mx-4 mb-2"
                    >
                        <button className="font-medium hover:text-primary transition-all">
                            <ArrowLongRightIcon className="h-6 w-6" />
                        </button>
                    </Link>
                ) : (
                    <div></div>
                )}
            </CardFooter>
        </Card>
    );
};

export default TestCard;
