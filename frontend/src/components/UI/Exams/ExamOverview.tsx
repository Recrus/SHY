import React, { useRef, useState, FC } from "react";
import { Skeleton } from "@mui/material";
import RadarChart from "../RadarChart/RadarChart";
import { Progress, Chip, Button, Alert, Input } from "@material-tailwind/react";
import { ExamOverviewProps } from "../../../../types/types";
import axiosFetch from "../../../plugins/axios";
import TheDialog from "../TheDialog/TheDialog";
import ErrorMessage from "../Error/ErrorMessage";

const ExamOverview: FC<ExamOverviewProps> = ({
    loading,
    avgPerformance,
    totalAttempts,
    passedRate,
    radarData,
    role,
    setRefetch,
}) => {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        const nameValue = name.current?.value;
        const descriptionValue = description.current?.value;

        try {
            await axiosFetch.post("/exams", {
                name: nameValue,
                description: descriptionValue,
            });

            setOpen((prev) => !prev);
            setRefetch((prevState) => (prevState += 1));
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 1500);
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;

                const errors = data.errors;

                if (errors) {
                    setNameError(errors.name ? errors.name[0] : "");
                    setDescriptionError(
                        errors.description ? errors.description[0] : "",
                    );
                }
            } else {
                console.log("Error", error.message);
            }
        }
    };

    const handleOpen = () => {
        setOpen((prevState) => !prevState);
        setNameError("");
        setDescriptionError("");
    };

    const customBody = (
        <>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                label="Name"
                labelProps={{
                    className: "!text-silver",
                }}
                inputRef={name}
                className="text-theme"
            />
            <ErrorMessage error={nameError} />
            <Input
                crossOrigin="anonymous"
                color="indigo"
                label="Description"
                labelProps={{
                    className: "!text-silver",
                }}
                inputRef={description}
                className="text-theme"
            />
            <ErrorMessage error={descriptionError} />
        </>
    );

    const customFooter = (
        <>
            <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="indigo" onClick={handleSubmit}>
                <span>Confirm</span>
            </Button>
        </>
    );

    return (
        <div className="flex flex-col justify-between mt-6 rounded-md shadow-md p-4 dark:bg-dark-accent max-h-[740px]">
            <div className="text-center">
                Average Performance
                {loading ? (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        height="2rem"
                        className="mt-6"
                    />
                ) : (
                    <Progress
                        value={avgPerformance}
                        color="amber"
                        label={true}
                        className="h-8 mt-6"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-6 items-center p-6">
                <div>Total Attempts</div>
                <Chip
                    variant="outlined"
                    value={totalAttempts}
                    color="amber"
                    className="text-center border-2"
                />
                <div>Successful exams</div>
                <Chip
                    variant="outlined"
                    value={passedRate}
                    color="amber"
                    className="text-center border-2"
                />
            </div>
            {role === 1 ? (
                <div className="h-[400px] rounded shadow-md flex-center items-center text-gray dark:bg-dark-neutral">
                    {loading ? (
                        <Skeleton
                            variant="circular"
                            animation="wave"
                            height="24rem"
                            width="24rem"
                        />
                    ) : (
                        <RadarChart data={radarData} />
                    )}
                </div>
            ) : null}
            {role === 1 ? (
                <div className="mt-3">
                    <div className="flex-center">
                        <TheDialog
                            openButton="Create"
                            title="Create exam"
                            bodyContent={customBody}
                            footerButtons={customFooter}
                            open={open}
                            handleOpen={handleOpen}
                        />
                    </div>
                    <Alert
                        color="green"
                        className="fixed bottom-24 right-4 w-1/8"
                        open={openAlert}
                    >
                        The exam created successfully.
                    </Alert>
                </div>
            ) : null}
        </div>
    );
};

export default ExamOverview;
