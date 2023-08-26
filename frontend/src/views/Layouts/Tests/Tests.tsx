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
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import TestCard from "./TestCard";

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
                {tests?.map((test) => <TestCard key={test.id} test={test} />)}
            </div>
        </div>
    );
};

export default Tests;
