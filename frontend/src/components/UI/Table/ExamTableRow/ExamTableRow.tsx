import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../../../context/StateContext";
import {
    ExamTableRowProps,
    initialFromDataExamEdit,
} from "../../../../../types/types";
import axiosFetch from "../../../../plugins/axios";
import EditExamDialog from "./EditExamDialog";

const ExamTableRow: React.FC<ExamTableRowProps> = ({
    id,
    exam_id,
    classes,
    link,
    reviewer,
    reviewersData,
    employee,
    setRefetch,
}) => {
    const [open, setOpen] = useState(false);
    const { user } = useStateContext();
    const [formData, setFormData] = useState<initialFromDataExamEdit>({
        reviewer_id: reviewer.id,
        employee_id: employee.id,
        link: link,
        exam_id: exam_id,
    });
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled: boolean = !isFormModified;
    const [select, setSelect] = useState<string | undefined>(
        String(reviewer.id),
    );

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        setFormData({
            reviewer_id: reviewer.id,
            employee_id: employee.id,
            link: link,
            exam_id: exam_id,
        });
        setSelect(String(reviewer.id));
    }, [reviewer, link, exam_id, employee]);

    const handler = (value: string | undefined) => {
        setSelect(value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            reviewer_id: Number(value),
        }));
        setIsFormModified(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setIsFormModified(true);
    };

    const handleDiscardChanges = () => {
        setFormData({
            reviewer_id: reviewer.id,
            employee_id: employee.id,
            link: link,
            exam_id: exam_id,
        });
        setSelect(String(formData.reviewer_id));
        setIsFormModified(false);
        handleOpen();
    };

    const handleSaveChanges = async () => {
        const formDataToSend = { ...formData };

        try {
            await axiosFetch.put(`/exam-links/${id}`, formDataToSend);

            setRefetch((prevState) => (prevState += 1));
            setFormData({ ...formData });
            handleOpen();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                >
                    {reviewer.first_name + " " + reviewer.last_name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                    as="a"
                    href={link}
                >
                    {link}
                </Typography>
            </td>
            {user?.role_id === 1 ? (
                <td className={classes}>
                    <Button
                        className="shadow-none pr-0 text-theme hover:text-primary hover:shadow-none"
                        onClick={handleOpen}
                    >
                        <PencilIcon className="h-4 w-4" />
                    </Button>
                    <EditExamDialog
                        formData={formData}
                        reviewersData={reviewersData}
                        open={open}
                        handler={handler}
                        handleDiscardChanges={handleDiscardChanges}
                        handleInputChange={handleInputChange}
                        handleOpen={handleOpen}
                        handleSaveChanges={handleSaveChanges}
                        saveButtonDisabled={saveButtonDisabled}
                        select={select}
                    />
                </td>
            ) : (
                <td className={classes}></td>
            )}
        </tr>
    );
};

export default ExamTableRow;
