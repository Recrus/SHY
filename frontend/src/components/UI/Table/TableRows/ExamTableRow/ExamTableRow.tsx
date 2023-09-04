import React, { ChangeEvent, useEffect, useState, FC } from "react";
import {
    Button,
    Input,
    Select,
    Option,
    Typography,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../../../../context/StateContext";
import {
    ExamTableRowProps,
    initialFromDataExamEdit,
} from "../../../../../../types/types";
import axiosFetch from "../../../../../plugins/axios";
import TheDialog from "../../../TheDialog/TheDialog";

const ExamTableRow: FC<ExamTableRowProps> = ({
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
        isFormModified: false,
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
            isFormModified: false,
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
            isFormModified: false,
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

    const customBody = (
        <>
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
                    className="text-theme"
                />
            </div>
        </>
    );

    const customFooter = (
        <>
            <Button variant="text" color="red" className="mr-1">
                <span onClick={handleDiscardChanges}>Cancel</span>
            </Button>
            <Button color="indigo" disabled={saveButtonDisabled}>
                <span onClick={handleSaveChanges}>Confirm</span>
            </Button>
        </>
    );

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
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                    as="a"
                    href={link}
                >
                    {employee.first_name} {employee.last_name}
                </Typography>
            </td>
            {user?.role_id === 1 ? (
                <td className={classes}>
                    <TheDialog
                        openButton={PencilIcon}
                        title="Edit exam"
                        bodyContent={customBody}
                        footerButtons={customFooter}
                        open={open}
                        handleOpen={handleOpen}
                    />
                </td>
            ) : (
                <td className={classes}></td>
            )}
        </tr>
    );
};

export default ExamTableRow;
