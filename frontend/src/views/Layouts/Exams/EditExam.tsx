import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Exam, LinkData, UserData } from "../../../../types/types";
import axiosFetch from "../../../plugins/axios";
import { Button, Typography } from "@material-tailwind/react";
import ExamTableRow from "../../../components/UI/Table/ExamTableRow/ExamTableRow";
import ExamRowSkeleton from "../../../components/UI/Table/ExamTableRow/ExamRowSkeleton";
import { useStateContext } from "../../../context/StateContext";
import CreateExamLinkDialog from "../../../components/UI/Table/ExamTableRow/CreateExamLinkDialog";

const EditExam = () => {
    const { state } = useLocation();
    const { user } = useStateContext();
    const exam: Exam = state.exam;
    const [links, setLinks] = useState<LinkData[]>([]);
    const TABLE_HEAD = ["Name of reviewer", "Link", ""];
    const [loading, setLoading] = useState(true);
    const [reviewers, setReviewers] = useState<UserData[]>([]);
    const [employees, setEmployees] = useState<UserData[]>([]);
    const [refetch, setRefetch] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const PLACEHOLDER_ROWS = 5;

    const handleOpenCreateDialog = () => setOpenCreateDialog(!openCreateDialog);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosFetch.get(`/exam-links/${exam.id}`);
                const linksData = res.data.data;

                setLinks(linksData);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchReviewers = async () => {
            try {
                const res = await axiosFetch.get("/users?filter[role_id]=4");
                const reviewers: UserData[] = res.data.data;

                setReviewers(reviewers);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchEmployees = async () => {
            try {
                const res = await axiosFetch.get("/users?filter[role_id]=3");
                const employees: UserData[] = res.data.data;

                setEmployees(employees);
            } catch (e) {
                console.log(e);
            }
        };

        if (user?.role_id === 1) {
            fetchReviewers();
            fetchEmployees();
        }

        fetchData();
    }, [refetch]);

    return (
        <div className="flex flex-col mt-6">
            <div className="p-4 flex flex-col shadow-md rounded">
                <div className="mb-2 text-lg">{exam.name}</div>
                <div>{exam.description}</div>
            </div>
            <div className="p-4 shadow-md rounded mt-6">
                <div className="flex justify-between items-center p-4 shadow-md rounded-t">
                    <div className="mb-2">Existing exams</div>
                    {user?.role_id === 1 ? (
                        <div>
                            <Button
                                variant="text"
                                className="text-sm p-1 hover:text-primary"
                                onClick={handleOpenCreateDialog}
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
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </Button>
                            <CreateExamLinkDialog
                                reviewersData={reviewers}
                                open={openCreateDialog}
                                handleOpen={handleOpenCreateDialog}
                                employeesData={employees}
                                setRefetch={setRefetch}
                                exam_id={exam.id}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
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
                            : links.map(
                                  (
                                      { link, reviewer, id, employee, exam_id },
                                      index,
                                  ) => {
                                      const isLast = index === links.length - 1;
                                      const classes = isLast
                                          ? "p-4"
                                          : "p-4 border-b border-blue-gray-50";

                                      return (
                                          <ExamTableRow
                                              classes={classes}
                                              link={link}
                                              reviewer={reviewer}
                                              key={index}
                                              id={id}
                                              exam_id={exam_id}
                                              reviewersData={reviewers}
                                              employee={employee}
                                              setRefetch={setRefetch}
                                          />
                                      );
                                  },
                              )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EditExam;
