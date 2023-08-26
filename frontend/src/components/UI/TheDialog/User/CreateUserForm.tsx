import React, { FC, RefObject } from "react";
import { Input } from "@material-tailwind/react";
import ErrorMessage from "../../Error/ErrorMessage";

export interface CreateUserFormProps {
    firstName: RefObject<HTMLInputElement>;
    firstNameError: string | null;
    lastName: RefObject<HTMLInputElement>;
    lastNameError: string | null;
    email: RefObject<HTMLInputElement>;
    emailError: string | null;
    password: RefObject<HTMLInputElement>;
    passwordError: string | null;
}

const CreateUserForm: FC<CreateUserFormProps> = ({
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    email,
    emailError,
    password,
    passwordError,
}) => {
    return (
        <form className="grid gap-4 md:grid-cols-2">
            <div>
                <Input
                    crossOrigin="anonymous"
                    color="indigo"
                    type="text"
                    label="First Name"
                    inputRef={firstName}
                    labelProps={{
                        className: "!text-silver",
                    }}
                    className="text-theme"
                />
                <ErrorMessage error={firstNameError} />
            </div>
            <div>
                <Input
                    crossOrigin="anonymous"
                    color="indigo"
                    type="text"
                    label="Last Name"
                    inputRef={lastName}
                    labelProps={{
                        className: "!text-silver",
                    }}
                    className="text-theme"
                />
                <ErrorMessage error={lastNameError} />
            </div>
            <div className="md:col-span-2">
                <Input
                    crossOrigin="anonymous"
                    color="indigo"
                    type="email"
                    label="Email"
                    inputRef={email}
                    labelProps={{
                        className: "!text-silver",
                    }}
                    className="text-theme"
                />
                <ErrorMessage error={emailError} />
            </div>
            <div className="md:col-span-2">
                <Input
                    crossOrigin="anonymous"
                    color="indigo"
                    type="password"
                    label="Password"
                    inputRef={password}
                    labelProps={{
                        className: "!text-silver",
                    }}
                    className="text-theme"
                />
                <ErrorMessage error={passwordError} />
            </div>
        </form>
    );
};

export default CreateUserForm;
