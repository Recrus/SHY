import React, { ChangeEvent, useState, FC } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography, Button } from "@material-tailwind/react";
import axiosFetch from "../../../../../plugins/axios";
import {
    InitialFormDataUserRow,
    UserTableRowProps,
} from "../../../../../../types/types";
import EditUser from "../../../Forms/EditUser";
import TheDialog from "../../../TheDialog/TheDialog";
import DeleteDialog from "../../../TheDialog/DeleteDialog";

const UserTableRow: FC<UserTableRowProps> = ({
    userData,
    isLast,
    refetchData,
    setCurrentPage,
}) => {
    const { id, first_name, last_name, user_name, phone, email, created_at } =
        userData;
    const classes: string = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    const [openFirstDialog, setOpenFirstDialog] = useState(false);
    const initialFormData: InitialFormDataUserRow = {
        first_name: first_name,
        last_name: last_name,
        user_name: user_name ? user_name : "-",
        phone: phone ? phone : "-",
        email: email,
    };
    const [formData, setFormData] = useState({ ...initialFormData });
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled: boolean = !isFormModified;

    const handleOpenFirstDialog = () => {
        setOpenFirstDialog(!openFirstDialog);
    };

    const handleDelete = () => {
        axiosFetch
            .delete(`/users/${id}`)
            .then(() => {
                refetchData();
                setCurrentPage(1);
            })
            .catch((err) => {
                console.log(err);
            });
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
        setFormData({ ...initialFormData });
        setIsFormModified(false);
        handleOpenFirstDialog();
    };

    const handleSaveChanges = async () => {
        const formDataToSend = { ...formData };

        try {
            await axiosFetch.patch(`/users/${id}`, formDataToSend);
            refetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const customEditFooter = (
        <div>
            <Button variant="text" color="red">
                <span onClick={handleDiscardChanges}>Cancel</span>
            </Button>
            <Button color="indigo" disabled={saveButtonDisabled}>
                <span onClick={handleSaveChanges}>Confirm</span>
            </Button>
        </div>
    );

    const customEditBody = (
        <form className="grid md:grid-cols-2 grid-rows-4 gap-4 items-center transition-all text-theme">
            <EditUser
                formData={formData}
                handleInputChange={handleInputChange}
                footer={false}
            />
        </form>
    );

    return (
        <tr key={id}>
            <td className={classes}>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-theme"
                        >
                            {`${id}. ${first_name} ${last_name}`}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 text-theme"
                        >
                            {email}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className={classes}>
                <div className="flex flex-col">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-theme"
                    >
                        {user_name === null ? "–" : user_name}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <div className="w-max">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-theme"
                    >
                        {phone === null ? "-" : phone}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                >
                    {new Date(created_at).toLocaleDateString()}
                </Typography>
            </td>
            <td className={`${classes} w-28`}>
                <TheDialog
                    openButton={PencilIcon}
                    title={`Edit ${first_name}`}
                    bodyContent={customEditBody}
                    footerButtons={customEditFooter}
                    open={openFirstDialog}
                    handleOpen={handleOpenFirstDialog}
                />
                <DeleteDialog title="user" handleDelete={handleDelete} />
            </td>
        </tr>
    );
};

export default UserTableRow;
