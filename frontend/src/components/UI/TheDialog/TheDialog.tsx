import React, { createElement, FC } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { TheDialogProps } from "../../../../types/types";

const TheDialog: FC<TheDialogProps> = ({
    openButton,
    title,
    bodyContent,
    footerButtons,
    iconSize = "w-4 h-4",
    open,
    handleOpen,
}) => {
    return (
        <>
            {typeof openButton === "string" ? (
                <Button onClick={handleOpen} color="indigo">
                    {openButton}
                </Button>
            ) : "icon" in openButton ? (
                <Button onClick={handleOpen} color="indigo">
                    <div className="flex text-theme font-medium tracking-wide">
                        {createElement(openButton.icon, {
                            strokeWidth: 1,
                            className: "h-6 w-6 mr-2",
                        })}
                        {openButton.text}
                    </div>
                </Button>
            ) : (
                <IconButton
                    variant="text"
                    className="hover:text-primary transition-all"
                    onClick={handleOpen}
                >
                    {createElement(openButton, {
                        strokeWidth: 1,
                        className: iconSize,
                    })}
                </IconButton>
            )}

            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[44rem] dark:bg-dark-neutral">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid h-28 place-items-center bg-neutral dark:bg-dark-accent"
                    >
                        <Typography
                            variant="h3"
                            className="uppercase text-theme text-xl"
                        >
                            {title}
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        {bodyContent || <div></div>}
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        {footerButtons || (
                            <>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button color="indigo">
                                    <span>Confirm</span>
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default TheDialog;
