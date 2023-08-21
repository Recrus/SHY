import React, { ChangeEvent, useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import axiosFetch from "../../../plugins/axios";
import { QuestionEditDialogProps } from "../../../../types/types";

const QuestionEditDialog: React.FC<QuestionEditDialogProps> = ({
    answer,
    setRefetch,
    correctAnswerCount,
}) => {
    const [open, setOpen] = useState<number | null>(null);
    const initialFormData = {
        text: answer.text,
        answer: answer.answer,
        question_id: answer.question_id,
    };
    const [formData, setFormData] = useState({ ...initialFormData });

    const handleOpen = (answerId: number | null) => setOpen(answerId);

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
        handleOpen(null);
    };

    const handleSaveChages = async () => {
        await axiosFetch.put(`/answers/${answer.id}`, formData);

        setRefetch((prevState) => (prevState += 1));

        handleOpen(null);
    };

    return (
        <div className="flex items-center">
            <button onClick={() => handleOpen(answer.id)}>
                <PencilIcon className="h-4 w-4 hover:text-primary transition-all" />
            </button>
            <Dialog
                open={open === answer.id}
                handler={handleDiscardChanges}
                className="dark:bg-dark-neutral"
            >
                <DialogHeader className="text-theme">Edit answer</DialogHeader>
                <DialogBody divider>
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
                        className="text-dark-accent dark:text-neutral font-primary"
                    />
                    <div className="flex-center">
                        <Checkbox
                            crossOrigin="anonymous"
                            color="green"
                            label="Is this correct answer?"
                            checked={formData.answer}
                            onChange={handleCheckboxChange}
                            disabled={
                                formData.answer && correctAnswerCount === 1
                            }
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleDiscardChanges}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSaveChages}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default QuestionEditDialog;
