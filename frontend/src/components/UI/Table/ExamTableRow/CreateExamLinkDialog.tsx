import React, { ChangeEvent, useState } from "react";
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
import axiosFetch from "../../../../plugins/axios";
import {
    CreateExamLinkDialogProps,
    initialFromDataExamEdit,
} from "../../../../../types/types";

const CreateExamLinkDialog: React.FC<CreateExamLinkDialogProps> = ({
    open,
    handleOpen,
    employeesData,
    setRefetch,
    reviewersData,
    exam_id,
}) => {
    const initialFormData: initialFromDataExamEdit = {
        reviewer_id: null,
        employee_id: null,
        link: "",
        exam_id: exam_id,
    };
    const [selectReviewer, setSelectReviewer] = useState<string | undefined>();
    const [selectEmployee, setSelectEmployee] = useState<string | undefined>();
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled: boolean = !isFormModified;
    const [formData, setFormData] =
        useState<initialFromDataExamEdit>(initialFormData);
    const [reviewerError, setReviewerError] = useState("");
    const [employeeError, setEmployeeError] = useState("");
    const [linkError, setLinkError] = useState("");

    const setFormValue = (key: string, value?: string | number) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setIsFormModified(true);
    };

    const handleErrors = (errors: any) => {
        setEmployeeError(errors?.employee_id ? errors.employee_id[0] : "");
        setReviewerError(errors?.reviewer_id ? errors.reviewer_id[0] : "");
        setLinkError(errors?.link ? errors.link[0] : "");
    };

    const handleSelectReviewer = (value: string | undefined) => {
        setSelectReviewer(value);
        handleErrors(undefined);
        setFormValue("reviewer_id", value);
    };

    const handleSelectEmployee = (value: string | undefined) => {
        setSelectEmployee(value);
        handleErrors(undefined);
        setFormValue("employee_id", value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        handleErrors(undefined);
        setFormValue(name, value);
    };

    const handleDiscardChanges = () => {
        setFormData({
            reviewer_id: null,
            employee_id: null,
            link: "",
            exam_id: exam_id,
        });
        setSelectReviewer("");
        setSelectEmployee("");
        handleErrors(undefined);
        setIsFormModified(false);
        handleOpen();
    };

    const handleSaveChanges = async () => {
        const formDataToSend = { ...formData };

        try {
            await axiosFetch.post(`/exam-links`, formDataToSend);

            setRefetch((prevState) => (prevState += 1));
            setFormData(initialFormData);
            handleErrors(undefined);
            setSelectReviewer("");
            setSelectEmployee("");
            handleOpen();
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;

                const errors = data.errors;

                if (errors) {
                    handleErrors(errors);
                }
            } else {
                console.log("Error", error.message);
            }
        }
    };

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            className="dark:bg-dark-accent"
        >
            <DialogHeader className="text-theme">Create exam link</DialogHeader>
            <DialogBody divider>
                <div className="mb-2">
                    <Select
                        label="Select reviewer"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        name="reviewer_id"
                        color="indigo"
                        value={selectReviewer}
                        className="text-theme"
                        onChange={handleSelectReviewer}
                    >
                        {reviewersData.map((user) => (
                            <Option key={user.id} value={String(user.id)}>
                                {user.first_name + " " + user.last_name}
                            </Option>
                        ))}
                    </Select>
                    {reviewerError && (
                        <div className="text-red-500 text-xs mt-1">
                            {reviewerError}
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    <Select
                        label="Select employee"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        name="reviewer_id"
                        color="indigo"
                        value={selectEmployee}
                        className="text-theme"
                        onChange={handleSelectEmployee}
                    >
                        {employeesData.map((user) => (
                            <Option key={user.id} value={String(user.id)}>
                                {user.first_name + " " + user.last_name}
                            </Option>
                        ))}
                    </Select>
                    {employeeError && (
                        <div className="text-red-500 text-xs mt-1">
                            {employeeError}
                        </div>
                    )}
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
                    {linkError && (
                        <div className="text-red-500 text-xs mt-1">
                            {linkError}
                        </div>
                    )}
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

export default CreateExamLinkDialog;
