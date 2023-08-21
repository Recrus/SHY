import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Chip,
    Typography,
} from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios";
import { Link } from "react-router-dom";
import { Test } from "../../../../types/types";
import { useStateContext } from "../../../context/StateContext";

type TestResult = {
    id: number;
    test_id: number;
    mark: number;
    is_passed: boolean;
    student_id: number;
};

const Tests = () => {
    const [tests, setTests] = useState<Test[]>();
    const { user } = useStateContext();

    useEffect(() => {
        // const fetchTests = async () => {
        //     try {
        //         const res = await axiosFetch.get("/tests");
        //
        //         setTests(res.data.data);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };
        //
        // const fetchTestResults = async () => {
        //     try {
        //         const res = await axiosFetch.get(`/user/${user?.id}/tests`);
        //
        //         console.log(res);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };
        //
        // if (user?.role_id === 3) {
        //     fetchTestResults();
        //     setTests((prevState) => {});
        // }
        //
        // fetchTests();

        let fetchedTests: Test[] = [];

        const fetchExams = async () => {
            try {
                const res = await axiosFetch.get("/tests");
                fetchedTests = res.data.data;
                setTests(fetchedTests);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchTestResults = async () => {
            try {
                const res = await axiosFetch.get(`/user/${user?.id}/tests`);
                if (fetchedTests.length) {
                    const combinedData = fetchedTests.map((test) => {
                        const relatedResult = res.data.data.find(
                            (result: TestResult) => result.test_id === test.id,
                        );

                        return {
                            ...test,
                            mark: relatedResult ? relatedResult.mark : null,
                            is_passed: relatedResult
                                ? relatedResult.is_passed
                                : null,
                        };
                    });
                    setTests(combinedData);
                } else {
                    console.log("error fetch tests");
                }
            } catch (e) {
                console.log(e);
            }
        };

        if (user?.role_id === 3) {
            fetchExams().then(() => {
                fetchTestResults();
            });
        } else {
            fetchExams();
        }
    }, [user]);

    return (
        <div className="flex justify-center items-center mt-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
                {tests?.map((test) => (
                    <Card
                        className="w-72 sm:w-96 dark:bg-dark-accent justify-between"
                        key={test.id}
                    >
                        <CardBody className="pb-2">
                            <div className="flex-between items-center mb-2">
                                <Typography
                                    variant="h5"
                                    color="blue-gray"
                                    className="text-theme font-primary mr-2"
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
                                                className="text-sm font-accent"
                                            />
                                        ) : (
                                            <Chip
                                                value="Failed"
                                                variant="outlined"
                                                color="red"
                                                className="text-sm font-accent"
                                            />
                                        )
                                    ) : (
                                        <Chip
                                            value="Not Done"
                                            variant="outlined"
                                            color="gray"
                                            className="text-sm font-accent"
                                        />
                                    )
                                ) : null}
                            </div>
                            <Typography className="text-theme font-accent">
                                {test.description}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-2">
                            {(user?.role_id === 3 && test.is_passed === null) ||
                            user?.role_id === 1 ? (
                                <Link to={`${test.id}`} state={{ test: test }}>
                                    <div className="flex items-center gap-2 text-sm font-medium hover:text-primary px-4 pb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            ) : (
                                <div></div>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Tests;
