import React, { ChangeEvent, useState, FC } from "react";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import axiosFetch from "../../../plugins/axios";
import { QuestionEditDialogProps } from "../../../../types/types";
import TheDialog from "../TheDialog/TheDialog";

const QuestionEditDialog: FC<QuestionEditDialogProps> = ({
    answer,
    setRefetch,
    correctAnswerCount,
}) => {
    const [open, setOpen] = useState(false);
    const initialFormData = {
        text: answer.text,
        answer: answer.answer,
        question_id: answer.question_id,
    };
    const [formData, setFormData] = useState({ ...initialFormData });

    const handleOpen = () => setOpen(!open);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked && correctAnswerCount === 1 && formData.answer) {
            console.log(true);
            return;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            answer: e.target.checked,
        }));
    };

    const handleDiscardChanges = () => {
        setFormData({ ...initialFormData });
        handleOpen();
    };

    const handleSaveChages = async () => {
        await axiosFetch.put(`/answers/${answer.id}`, formData);

        setRefetch((prevState) => (prevState += 1));

        handleOpen();
    };

    const customBody = (
        <>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                name="text"
                label="Link"
                labelProps={{
                    className: "!text-silver",
                }}
                value={formData.text}
                onChange={handleInputChange}
                className="text-theme"
            />
            <div className="flex-center text-theme">
                <Checkbox
                    crossOrigin="anonymous"
                    color="green"
                    label="Is this correct answer?"
                    checked={formData.answer}
                    onChange={handleCheckboxChange}
                    disabled={formData.answer && correctAnswerCount === 1}
                />
            </div>
        </>
    );

    const customFooter = (
        <>
            <Button
                variant="text"
                color="red"
                onClick={handleDiscardChanges}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button color="indigo" onClick={handleSaveChages}>
                <span>Confirm</span>
            </Button>
        </>
    );

    return (
        <div className="flex items-center">
            <TheDialog
                openButton={PencilIcon}
                title="Edit answer"
                bodyContent={customBody}
                footerButtons={customFooter}
                open={open}
                handleOpen={handleOpen}
            />
        </div>
    );
};

export default QuestionEditDialog;
