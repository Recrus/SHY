import React from "react";
import { ExamCreateDialogProps } from "../../../../types/types";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    Input,
} from "@material-tailwind/react";

const ExamCreateDialog: React.FC<ExamCreateDialogProps> = ({
    open,
    handleOpen,
    handleSubmit,
    name,
    description,
    nameError,
    descriptionError,
}) => {
    return (
        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full max-w-[44rem] dark:bg-dark-neutral">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center bg-neutral dark:bg-dark-accent"
                >
                    <Typography variant="h3" className="uppercase text-theme">
                        Create exam
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        crossOrigin="anonymous"
                        color="indigo"
                        label="Name"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        inputRef={name}
                        className="text-theme font-primary"
                    />
                    {nameError && (
                        <div className="text-red-500 text-xs mt-1">
                            {nameError}
                        </div>
                    )}
                    <Input
                        crossOrigin="anonymous"
                        color="indigo"
                        label="Description"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        inputRef={description}
                        className="text-theme font-primary"
                    />
                    {descriptionError && (
                        <div className="text-red-500 text-xs mt-1">
                            {descriptionError}
                        </div>
                    )}
                </CardBody>
                <CardFooter className="pt-0 flex justify-end">
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="indigo"
                        onClick={handleSubmit}
                    >
                        <span>Confirm</span>
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    );
};

export default ExamCreateDialog;
