import React, { useEffect, useState, FC } from "react";
import { Alert, Card, CardBody, Typography } from "@material-tailwind/react";
import { ExamCardProps } from "../../../../../types/types";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../../../context/StateContext";
import { TrashIcon } from "@heroicons/react/24/outline/index.js";
import axiosFetch from "../../../../plugins/axios";
import { Link } from "react-router-dom";
import DeleteDialog from "../../TheDialog/DeleteDialog";

const ExamCard: FC<ExamCardProps> = ({ exam, setRefetch }) => {
    const { user } = useStateContext();
    const [openAlert, setOpenAlert] = useState(false);
    const [link, setLink] = useState("");
    const [refetchExam, setRefetchExam] = useState(1);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const res = await axiosFetch.get(`/exam-links/${exam.id}`);
                const link = res.data.data[0]?.link;

                setLink(link);
            } catch (e) {
                console.log(e);
            }
        };

        fetchLink();
    }, [refetchExam]);

    const handleDeleteExam = async () => {
        try {
            await axiosFetch.delete(`/exams/${exam.id}`);

            setRefetch((prevState) => (prevState += 1));
        } catch (e) {
            console.log(e);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const handleSignUpToExam = async () => {
        try {
            const data = {
                employee_id: user?.id,
                exam_id: exam.id,
            };

            await axiosFetch.post("/exam-links", data);

            setRefetchExam((prevState) => (prevState += 1));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex justify-center lg:justify-normal">
            <Card className="mt-6 lg:w-11/12 dark:bg-dark-accent">
                <CardBody className="flex-between flex-col items-center md:flex-row">
                    <div className="max-w-[90%] mr-4">
                        <div className="flex items-center mb-2">
                            <Typography variant="h5" className="mr-2">
                                {exam.name}
                            </Typography>
                            {user?.role_id === 1 ? (
                                <div className="flex items-center">
                                    <Link
                                        to={`${exam.id}/edit`}
                                        state={{ exam: exam }}
                                    >
                                        <PencilIcon className="h-4 w-4 hover:text-primary transition-all" />
                                    </Link>
                                    <DeleteDialog
                                        title="exam"
                                        handleDelete={handleDeleteExam}
                                    />
                                </div>
                            ) : null}
                            {exam.is_accepted ||
                            user?.role_id === 1 ? null : link ? (
                                <button
                                    onClick={copyToClipboard}
                                    className="cursor-pointer"
                                    disabled={!link}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <button onClick={handleSignUpToExam}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <Typography>{exam.description}</Typography>
                    </div>
                    <div className="flex-center mt-2">
                        <div
                            className={`w-14 h-14 rounded-full flex-center items-center ${exam.colorClass}`}
                        >
                            {exam.avgMark
                                ? Number(exam.avgMark).toFixed(2)
                                : "N/A"}
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Alert
                color="green"
                className="fixed bottom-24 right-4 w-1/8"
                open={openAlert}
            >
                Link copied to clipboard!
            </Alert>
        </div>
    );
};

export default ExamCard;
