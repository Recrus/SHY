import React, { useRef } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid/index.js";
import axiosFetch from "../../../plugins/axios.js";

const TableCreateUserForm = ({ refetchData }) => {
    const [open, setOpen] = React.useState(false);
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const [firstNameError, setFirstNameError] = React.useState(null);
    const [lastNameError, setLastNameError] = React.useState(null);
    const [emailError, setEmailError] = React.useState(null);
    const [passwordError, setPasswordError] = React.useState(null);

    const handleOpen = () => {
        if (open) {
            setFirstNameError(null);
            setLastNameError(null);
            setEmailError(null);
            setPasswordError(null);
        }

        setOpen(!open);
    };

    const submitHandler = async () => {
        const firstNameValue = firstName.current.value;
        const lastNameValue = lastName.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        try {
            await axiosFetch.post("/users", {
                first_name: firstNameValue,
                last_name: lastNameValue,
                email: emailValue,
                password: passwordValue,
                permission_for_email: true,
                role_id: 3,
            });

            handleOpen();
            refetchData();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setFirstNameError(error.response.data.errors.first_name);
                setLastNameError(error.response.data.errors.last_name);
                setEmailError(error.response.data.errors.email);
                setPasswordError(error.response.data.errors.password);
            }
        }
    };

    return (
        <div className="flex justify-end">
            <Button
                className="flex items-center gap-3 font-primary font-normal"
                color="indigo"
                size="sm"
                onClick={handleOpen}
            >
                <UserPlusIcon strokeWidth={2} className="h-6 w-6" /> Add Member
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                className="dark:bg-dark-neutral"
            >
                <DialogHeader className="dark:text-neutral">
                    Create user
                </DialogHeader>
                <DialogBody className="dark:text-neutral" divider>
                    <form className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                ref={firstName}
                                name="fname"
                                className="bg-transparent text-dark-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg w-full"
                                placeholder="First name"
                            />
                            {firstNameError && (
                                <div className="text-red-500 text-xs mt-1">
                                    {firstNameError}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                ref={lastName}
                                name="lname"
                                className="bg-transparent text-dark-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg w-full"
                                placeholder="Last name"
                            />
                            {lastNameError && (
                                <div className="text-red-500 text-xs mt-1">
                                    {lastNameError}
                                </div>
                            )}
                        </div>

                        <div className="col-span-2">
                            <input
                                type="email"
                                ref={email}
                                name="email"
                                className="bg-transparent text-dark-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg w-full"
                                placeholder="Email"
                            />
                            {emailError && (
                                <div className="text-red-500 text-xs">
                                    {emailError}
                                </div>
                            )}
                        </div>

                        <div className="col-span-2">
                            <input
                                type="password"
                                ref={password}
                                className="bg-transparent text-dark-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg w-full"
                                placeholder="Password"
                            />
                            {passwordError && (
                                <div className="text-red-500 text-xs mt-1">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="indigo"
                        onClick={() => {
                            submitHandler();
                        }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default TableCreateUserForm;
