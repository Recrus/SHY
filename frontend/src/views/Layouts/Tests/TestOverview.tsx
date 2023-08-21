import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Questions, Test } from "../../../../types/types";
import ExamRowSkeleton from "../../../components/UI/Table/ExamTableRow/ExamRowSkeleton";
import axiosFetch from "../../../plugins/axios";
import QuestionTableRow from "../../../components/UI/Question/QuestionTableRow";
import { useStateContext } from "../../../context/StateContext";
import TestPass from "./TestPass";

const TestOverview = () => {
    const { state } = useLocation();
    const test: Test = state.test;
    const { user } = useStateContext();
    const TABLE_HEAD = ["Question", "Description", ""];
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const PLACEHOLDER_ROWS = 5;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axiosFetch.get(`/test/${test.id}/questions`);

                setQuestions(res.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div>
            <Card className="my-6 w-full dark:bg-dark-accent">
                <CardBody>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2 text-theme font-primary"
                    >
                        {test.name}
                    </Typography>
                    <Typography className="font-accent">
                        {test.description}
                    </Typography>
                </CardBody>
            </Card>
            {user?.role_id === 1 ? (
                <table className="w-full min-w-max table-auto text-left shadow-md rounded">
                    <thead className="bg-neutral dark:bg-dark-accent">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        className="font-normal leading-none opacity-80 text-theme"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from(
                                  { length: PLACEHOLDER_ROWS },
                                  (_, index) => (
                                      <ExamRowSkeleton
                                          key={index}
                                          length={PLACEHOLDER_ROWS}
                                          index={index}
                                      />
                                  ),
                              )
                            : questions.map(({ id, question }, index) => {
                                  const isLast = index === questions.length - 1;
                                  const classes = isLast
                                      ? "p-4"
                                      : "p-4 border-b border-blue-gray-50";

                                  return (
                                      <QuestionTableRow
                                          classes={classes}
                                          question={question}
                                          key={id}
                                      />
                                  );
                              })}
                    </tbody>
                </table>
            ) : (
                <div>
                    <TestPass questions={questions} test={test} />
                </div>
            )}
        </div>
    );
};

export default TestOverview;
