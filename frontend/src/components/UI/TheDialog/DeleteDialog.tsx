import React, { FC, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Dialog,
    DialogFooter,
    DialogHeader,
    IconButton,
} from "@material-tailwind/react";

export interface DeleteDialogProps {
    title: string;
    handleDelete: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ title, handleDelete }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <IconButton
                variant="text"
                className="hover:text-primary transition-all"
                onClick={handleOpen}
            >
                <TrashIcon className="h-4 w-4" />
            </IconButton>
            <Dialog
                open={open}
                handler={handleOpen}
                className="dark:bg-dark-accent min-w-[90%] md:min-w-[60%] lg:min-w-[40%]"
            >
                <DialogHeader className="text-center justify-center text-theme text-lg md:text-xl">
                    Are you sure you want to delete this {title}?
                </DialogHeader>
                <DialogFooter className="justify-center">
                    <Button variant="text" color="red" onClick={handleOpen}>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        color="indigo"
                        onClick={() => {
                            handleDelete();
                            handleOpen();
                        }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default DeleteDialog;
