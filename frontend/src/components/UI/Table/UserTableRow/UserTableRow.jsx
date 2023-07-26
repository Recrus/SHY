import React, { useState } from "react";
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
import axiosFetch from "../../../../plugins/axios.js";

const UserTableRow = ({ userData, isLast, refetchData, setCurrentPage }) => {
    const { id, first_name, last_name, user_name, phone, email, created_at } =
        userData;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    const [open, setOpen] = useState(false);
    const [openFirstDialog, setOpenFirstDialog] = useState(false);
    const initialFormData = {
        first_name: first_name,
        last_name: last_name,
        user_name: user_name ? user_name : "-",
        phone: phone ? phone : "-",
        email: email,
    };
    const [formData, setFormData] = useState({ ...initialFormData });
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled = !isFormModified;

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setIsFormModified(true);
    };

    const handleDiscardChanges = (e) => {
        e.preventDefault();
        setFormData({ ...initialFormData });
        setIsFormModified(false);
        handleOpenFirstDialog();
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

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
                            className="font-normal dark:text-neutral"
                        >
                            {`${id}. ${first_name} ${last_name}`}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 dark:text-neutral"
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
                        className="font-normal dark:text-neutral"
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
                        className="font-normal dark:text-neutral"
                    >
                        {phone === null ? "-" : phone}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal dark:text-neutral"
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
                    className="dark:bg-dark-accent"
                >
                    <DialogHeader className="font-primary text-center dark:text-neutral">
                        Edit {first_name}
                    </DialogHeader>
                    <DialogBody divider>
                        <form className="grid grid-cols-2 grid-rows-4 gap-4 p-4 items-center dark:bg-dark-accent transition-all text-dark-accent dark:text-neutral">
                            <label htmlFor="first_name">First name</label>
                            <Input
                                type="text"
                                placeholder="First name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
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
                                type="text"
                                placeholder="Last name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
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
                                type="text"
                                placeholder="User name"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
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
                                type="text"
                                placeholder="Phone"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
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
                                type="email"
                                placeholder="Email"
                                className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
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
                    <DialogFooter className="flex justify-center">
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
                    className="dark:bg-dark-accent"
                >
                    <DialogHeader className="font-primary text-center dark:text-neutral">
                        Are you sure you want to delete this user?
                    </DialogHeader>
                    <DialogFooter className="flex justify-center">
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
