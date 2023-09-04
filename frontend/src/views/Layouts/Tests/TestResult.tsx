import React, { useEffect, useState } from "react";
import axiosFetch from "../../../plugins/axios";
import { Link, useLocation } from "react-router-dom";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Progress,
    Spinner,
    Typography,
} from "@material-tailwind/react";

export interface Result {
    correctAnswersCount: number;
    is_passed: boolean;
    mark: number;
    percentage: number;
    totalQuestions: number;
}

type ResultDetails = {
    color: string;
    name: string;
    title: string;
    description: string;
};

const TestResult = () => {
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { state } = useLocation();

    const getResultDetails = (isPassed: boolean): ResultDetails => ({
        color: isPassed ? "green-500" : "red-500",
        name: isPassed ? "Passed" : "Failed",
        title: isPassed ? "You are cool!" : "Don't worry!",
        description: isPassed
            ? "Your test result will be recorded and displayed on your profile for employers to see. Keep it up!"
            : "You can improve your result a little later. We are confident that you will be able to better prepare and pass the test.",
    });

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const result = await axiosFetch.get(`tests/${state.id}/check`);
                setResult(result.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };

        if (state.id) {
            fetchResults();
        } else {
            console.log("error");
        }
    }, [state.id]);

    const {
        color = "",
        name = "",
        title = "",
        description = "",
    } = result ? getResultDetails(result.is_passed) : {};

    return (
        <div className="flex-center">
            {loading ? (
                <div className="flex-center items-center h-[80vh]">
                    <Spinner
                        color="indigo"
                        className="h-40 w-40 text-neutral dark:text-dark-neutral"
                    />
                </div>
            ) : (
                <div className="flex-between w-2/3">
                    <Card className="mt-6 w-96 dark:bg-dark-neutral">
                        <CardHeader
                            className={`relative h-56 flex-center items-center bg-${color}`}
                        >
                            <div className="text-neutral text-2xl uppercase">
                                {name}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-2 text-theme"
                            >
                                {title}
                            </Typography>
                            <Typography>{description}</Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex-center">
                            <Link
                                to="/employee/tests"
                                className="text-theme uppercase border p-3 rounded font-medium hover:border-primary hover:text-primary transition-all"
                            >
                                <div className="flex-center items-center">
                                    <div className="mr-2">Back to tests</div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="mt-6 w-96 dark:bg-dark-neutral">
                        <CardBody className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <div className="mb-2">Your performance</div>
                                <Progress
                                    value={result?.percentage}
                                    color="amber"
                                />
                            </div>
                            <div className="mr-2">Total questions</div>
                            <Chip
                                variant="outlined"
                                value={result?.totalQuestions}
                                className="flex-center"
                            />
                            <div className="mr-2">Total correct answers</div>
                            <Chip
                                variant="outlined"
                                value={result?.correctAnswersCount}
                                className="flex-center"
                            />
                            <div className="mr-2">Mark</div>
                            <Chip
                                variant="outlined"
                                value={result?.mark}
                                className="flex-center"
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div></div>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default TestResult;
