import React, { useEffect, useState } from "react";
import { Answer, Questions, Test } from "../../../../types/types";
import axiosFetch from "../../../plugins/axios";
import {
    Card,
    ListItem,
    List,
    Button,
    ButtonGroup,
} from "@material-tailwind/react";
import { useStateContext } from "../../../context/StateContext";
import { useNavigate } from "react-router-dom";
import ExamRowSkeleton from "../../../components/UI/Table/ExamTableRow/ExamRowSkeleton";
import ExamTableRow from "../../../components/UI/Table/ExamTableRow/ExamTableRow";
import { Skeleton } from "@mui/material";

export interface TestPassProps {
    questions: Questions[];
    test: Test;
}

const TestPass: React.FC<TestPassProps> = ({ questions, test }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [pickedAnswers, setPickedAnswers] = useState<Record<number, number>>(
        {},
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { user } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const PLACEHOLDER_ROWS: number = 4;

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                if (
                    questions[currentQuestionIndex]?.question?.id !== undefined
                ) {
                    const response = await axiosFetch.get(
                        `/question/${questions[currentQuestionIndex]?.question?.id}/answers`,
                    );

                    setAnswers(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch answers:", error);
            }
        };

        fetchAnswers();
    }, [currentQuestionIndex, questions]);

    const handleAnswerSelect = (answerId: number) => {
        setPickedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questions[currentQuestionIndex]?.question?.id]: answerId,
        }));
        setErrorMessage(null);
    };

    const sendAnswersToServer = async () => {
        try {
            const jsonData = {
                ids: Object.entries(pickedAnswers).map(
                    ([question_id, answerId]) => ({
                        id: answerId,
                        fields: {
                            test_id: test.id,
                        },
                    }),
                ),
            };

            if (jsonData.ids.length === questions.length) {
                await axiosFetch.post(`/user/${user?.id}/answers`, jsonData);

                navigate("result", { state: test });
            } else {
                setErrorMessage("You need to answer on all questions");
            }
        } catch (error) {
            console.error("Failed to send answers:", error);
        }
    };

    return (
        <div>
            <Card className="dark:bg-dark-neutral p-4">
                {loading ? (
                    <div className="dark:bg-dark-accent p-2 rounded shadow-md">
                        <Skeleton height={40} width={200} />
                        <Skeleton height={40} />
                    </div>
                ) : (
                    <div className="dark:bg-dark-accent p-2 rounded shadow-md">
                        <div>
                            Question:{" "}
                            {questions[currentQuestionIndex]?.question?.name}
                        </div>
                        <div>
                            Description:{" "}
                            {
                                questions[currentQuestionIndex]?.question
                                    ?.description
                            }
                        </div>
                    </div>
                )}
                <div className="mt-4">Choose your answer:</div>
                <List>
                    {loading
                        ? Array.from(
                              { length: PLACEHOLDER_ROWS },
                              (_, index) => (
                                  <Skeleton key={index} height={40} />
                              ),
                          )
                        : answers.map((answer, index) => (
                              <ListItem
                                  selected={
                                      pickedAnswers[
                                          questions[currentQuestionIndex]
                                              ?.question?.id
                                      ] === answer.id
                                  }
                                  onClick={() => handleAnswerSelect(answer.id)}
                                  key={answer.id}
                                  className="text-theme font-accent font-light"
                              >
                                  {index + 1}. {answer.text}
                              </ListItem>
                          ))}
                </List>
                <div className="flex justify-between items-center">
                    <ButtonGroup variant="outlined" className="mr-2">
                        <Button
                            onClick={() => {
                                if (currentQuestionIndex > 0) {
                                    setCurrentQuestionIndex(
                                        (prevIndex) => prevIndex - 1,
                                    );
                                }
                            }}
                            disabled={currentQuestionIndex === 0}
                            className="font-light hover:text-primary"
                        >
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
                                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                                />
                            </svg>
                        </Button>
                        <Button
                            onClick={() => {
                                if (
                                    currentQuestionIndex <
                                    questions.length - 1
                                ) {
                                    setCurrentQuestionIndex(
                                        (prevIndex) => prevIndex + 1,
                                    );
                                }
                            }}
                            disabled={
                                currentQuestionIndex === questions.length - 1
                            }
                            className="font-light hover:text-primary"
                        >
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
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </svg>
                        </Button>
                    </ButtonGroup>
                    <Button
                        onClick={sendAnswersToServer}
                        className="font-light p-4 border rounded-full hover:text-primary transition-all"
                    >
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
                                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                            />
                        </svg>
                    </Button>
                </div>
                <div className="flex-center">
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default TestPass;
