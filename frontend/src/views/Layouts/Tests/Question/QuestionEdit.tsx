import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import {
    Card,
    CardBody,
    ListItemSuffix,
    Typography,
} from "@material-tailwind/react";
import axiosFetch from "../../../../plugins/axios";
import { Answer, Question } from "../../../../../types/types";
import QuestionEditDialog from "../../../../components/UI/Question/QuestionEditDialog";
import QuestionEditSkeleton from "../../../../components/UI/Question/QuestionEditSkeleton";

const QuestionEdit = () => {
    const { state } = useLocation();
    const question: Question = state.question;
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [refetch, setRefetch] = useState(1);
    const [loading, setLoading] = useState(true);
    const PLACEHOLDER_ROWS = 4;

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const res = await axiosFetch.get(
                    `/answers?filter[question_id]=${question.id}`,
                );

                setAnswers(res.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        fetchAnswers();
    }, [refetch]);

    const correctAnswerCount = useMemo(() => {
        return answers.filter((a) => a.answer).length;
    }, [answers]);

    return (
        <div>
            <Card className="my-6 dark:bg-dark-accent">
                <CardBody>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2 text-theme"
                    >
                        {question.name}
                    </Typography>
                    <Typography className="text-theme">
                        {question.description}
                    </Typography>
                </CardBody>
            </Card>
            <Card className="dark:bg-dark-neutral">
                <List className="!p-4">
                    {loading
                        ? Array.from(
                              { length: PLACEHOLDER_ROWS },
                              (_, index) => (
                                  <QuestionEditSkeleton
                                      index={index}
                                      length={length}
                                      key={index}
                                  />
                              ),
                          )
                        : answers.map((answer, index) => {
                              const classes = answer.answer
                                  ? "bg-light-green text-neutral"
                                  : "";

                              return (
                                  <ListItem
                                      className={`rounded transition-all my-2 font-light ${classes}`}
                                      key={answer.id}
                                  >
                                      {index + 1}. {answer.text}
                                      <ListItemSuffix>
                                          <QuestionEditDialog
                                              answer={answer}
                                              setRefetch={setRefetch}
                                              correctAnswerCount={
                                                  correctAnswerCount
                                              }
                                          />
                                      </ListItemSuffix>
                                  </ListItem>
                              );
                          })}
                </List>
            </Card>
        </div>
    );
};

export default QuestionEdit;
