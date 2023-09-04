import React, { useRef, FC } from "react";
import { Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid/index.js";
import axiosFetch from "../../../plugins/axios";
import { TableCreateUserFormProps } from "../../../../types/types";
import CreateUserForm from "../TheDialog/User/CreateUserForm";
import TheDialog from "../TheDialog/TheDialog";

const TableCreateUserForm: FC<TableCreateUserFormProps> = ({ refetchData }) => {
    const [open, setOpen] = React.useState(false);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
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

    const handleErrors = (error: any) => {
        if (error.response && error.response.data.errors) {
            setFirstNameError(error.response.data.errors.first_name);
            setLastNameError(error.response.data.errors.last_name);
            setEmailError(error.response.data.errors.email);
            setPasswordError(error.response.data.errors.password);
        }
    };

    const submitHandler = async () => {
        const firstNameValue = firstName.current?.value;
        const lastNameValue = lastName.current?.value;
        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;

        try {
            await axiosFetch.post("/users", {
                first_name: firstNameValue,
                last_name: lastNameValue,
                email: emailValue,
                password: passwordValue,
                permission_for_email: true,
                role_id: 3,
            });

            setOpen(false);
            refetchData();
        } catch (error: any) {
            handleErrors(error);
        }
    };

    const customFooter = (
        <div>
            <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button
                color="indigo"
                onClick={() => {
                    submitHandler();
                }}
            >
                <span>Confirm</span>
            </Button>
        </div>
    );

    return (
        <div className="flex justify-end">
            <TheDialog
                openButton={{ icon: UserPlusIcon, text: "Add member" }}
                title="Create User"
                bodyContent={
                    <CreateUserForm
                        firstName={firstName}
                        firstNameError={firstNameError}
                        lastName={lastName}
                        lastNameError={lastNameError}
                        email={email}
                        emailError={emailError}
                        password={password}
                        passwordError={passwordError}
                    />
                }
                footerButtons={customFooter}
                open={open}
                handleOpen={handleOpen}
            />
        </div>
    );
};

export default TableCreateUserForm;
