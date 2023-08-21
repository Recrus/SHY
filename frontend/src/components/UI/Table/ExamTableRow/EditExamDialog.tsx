import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { EditExamDialogProps } from "../../../../../types/types";

const EditExamDialog: React.FC<EditExamDialogProps> = ({
    open,
    handleOpen,
    select,
    handler,
    reviewersData,
    formData,
    handleInputChange,
    handleDiscardChanges,
    saveButtonDisabled,
    handleSaveChanges,
}) => {
    return (
        <Dialog
            open={open}
            handler={handleOpen}
            className="dark:bg-dark-accent"
        >
            <DialogHeader className="text-theme">Edit exam link</DialogHeader>
            <DialogBody divider>
                <div className="mb-2">
                    <Select
                        label="Select reviewer"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        name="reviewer_id"
                        color="indigo"
                        value={select}
                        className="text-theme"
                        onChange={handler}
                    >
                        {reviewersData.map((user) => (
                            <Option key={user.id} value={String(user.id)}>
                                {user.first_name + " " + user.last_name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Input
                        crossOrigin="anonymous"
                        color="indigo"
                        name="link"
                        label="Link"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        value={formData.link}
                        onChange={handleInputChange}
                        className="text-dark-accent dark:text-neutral font-primary"
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" className="mr-1">
                    <span onClick={handleDiscardChanges}>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    disabled={saveButtonDisabled}
                >
                    <span onClick={handleSaveChanges}>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default EditExamDialog;
