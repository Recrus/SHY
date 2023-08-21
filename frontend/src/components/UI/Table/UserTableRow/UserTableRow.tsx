import React, { ChangeEvent, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline/index.js";
import axiosFetch from "../../../../plugins/axios";
import {
    InitialFormDataUserRow,
    UserTableRowProps,
} from "../../../../../types/types";

const UserTableRow: React.FC<UserTableRowProps> = ({
    userData,
    isLast,
    refetchData,
    setCurrentPage,
}) => {
    const { id, first_name, last_name, user_name, phone, email, created_at } =
        userData;
    const classes: string = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    const [open, setOpen] = useState(false);
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

    const handleOpen = () => setOpen(!open);

    const handleOpenFirstDialog = () => {
        setOpenFirstDialog(!openFirstDialog);
    };

    const handleDelete = () => {
        axiosFetch
            .delete(`/users/${id}`)
            .then(() => {
                handleOpen();
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
            <td className={`${classes} w-40`}>
                <IconButton
                    variant="text"
                    color="deep-orange"
                    onClick={handleOpenFirstDialog}
                >
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
                <Dialog
                    open={openFirstDialog}
                    handler={handleOpenFirstDialog}
                    className="dark:bg-dark-accent min-w-[90%] md:min-w-[60%] lg:min-w-[50%] xl:min-w-[40%]"
                >
                    <DialogHeader className="font-primary text-lg md:text-xl text-center justify-center text-theme md:justify-normal">
                        Edit {first_name}
                    </DialogHeader>
                    <DialogBody divider className="p-0">
                        <form className="grid md:grid-cols-2 grid-rows-4 gap-4 p-4 items-center dark:bg-dark-accent transition-all text-theme">
                            <label htmlFor="first_name">First name</label>
                            <Input
                                crossOrigin="anonymous"
                                type="text"
                                placeholder="First name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-sm shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{
                                    className: "min-w-[100px]",
                                }}
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="last_name">Last name</label>
                            <Input
                                crossOrigin="anonymous"
                                type="text"
                                placeholder="Last name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-sm shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{
                                    className: "min-w-[100px]",
                                }}
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="user_name">User name</label>
                            <Input
                                crossOrigin="anonymous"
                                type="text"
                                placeholder="User name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-sm shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{
                                    className: "min-w-[100px]",
                                }}
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="phone">Phone</label>
                            <Input
                                crossOrigin="anonymous"
                                type="text"
                                placeholder="Phone"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-sm shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{
                                    className: "min-w-[100px]",
                                }}
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="email">Email</label>
                            <Input
                                crossOrigin="anonymous"
                                type="email"
                                placeholder="Email"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-sm shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{
                                    className: "min-w-[100px]",
                                }}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </form>
                    </DialogBody>
                    <DialogFooter className="flex-center">
                        <Button
                            variant="text"
                            color="red"
                            className="font-primary"
                        >
                            <span onClick={handleDiscardChanges}>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="indigo"
                            disabled={saveButtonDisabled}
                            className="font-primary"
                        >
                            <span onClick={handleSaveChanges}>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
                <IconButton
                    variant="text"
                    color="deep-orange"
                    onClick={handleOpen}
                >
                    <TrashIcon className="h-4 w-4" />
                </IconButton>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    className="dark:bg-dark-accent min-w-[90%] md:min-w-[60%] lg:min-w-[40%]"
                >
                    <DialogHeader className="font-primary text-center justify-center text-theme text-lg md:text-xl">
                        Are you sure you want to delete this user?
                    </DialogHeader>
                    <DialogFooter className="justify-center">
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="font-primary"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="indigo"
                            onClick={handleDelete}
                            className="font-primary"
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </td>
        </tr>
    );
};

export default UserTableRow;
