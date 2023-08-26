import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../media/logo-nobg.svg";
import DarkModeSwitcher from "../../../components/UI/DarkModeSwitcher/DarkModeSwitcher";
import { Checkbox } from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios";

import { useStateContext } from "../../../context/StateContext";
import ErrorMessage from "../../../components/UI/Error/ErrorMessage";

function SignUp() {
    const { setToken } = useStateContext();
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const permission = useRef<HTMLInputElement>(null);

    const submitHandler = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        const firstNameValue = firstName.current?.value;
        const lastNameValue = lastName.current?.value;
        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;
        const permissionValue = permission.current?.checked;

        try {
            const response = await axiosFetch.post("/auth/register", {
                first_name: firstNameValue,
                last_name: lastNameValue,
                email: emailValue,
                password: passwordValue,
                permission_for_email: permissionValue,
                role_id: 3,
            });

            setToken(response.data.access_token);
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;

                const errorData = JSON.parse(data);

                if (errorData) {
                    setFirstNameError(
                        errorData.first_name ? errorData.first_name[0] : "",
                    );
                    setLastNameError(
                        errorData.last_name ? errorData.last_name[0] : "",
                    );
                    setEmailError(errorData.email ? errorData.email[0] : "");
                    setPasswordError(
                        errorData.password ? errorData.password[0] : "",
                    );
                }
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <div className="h-screen w-screen dark:bg-dark-blue transition-all">
            <div className="w-1/2 mx-auto flex-center flex-col pt-20">
                <div className="flex items-center flex-col mb-[20px]">
                    <img src={logo} alt="#" className="h-[125px] w-1/6 mr-5" />
                    <div className="text-lg">Sign up</div>
                </div>
                <form className="grid grid-cols-2 gap-7">
                    <input
                        type="text"
                        ref={firstName}
                        name="fname"
                        className="bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg text-dark-neutral"
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        ref={lastName}
                        name="lname"
                        className="bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg text-dark-neutral"
                        placeholder="Last name"
                    />
                    <ErrorMessage error={firstNameError} />
                    <ErrorMessage error={lastNameError} />
                    <input
                        type="email"
                        ref={email}
                        name="email"
                        className="bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg text-dark-neutral"
                        placeholder="Email"
                    />
                    <ErrorMessage error={emailError} />
                    <input
                        type="password"
                        ref={password}
                        className="bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg text-dark-neutral"
                        placeholder="Password"
                    />
                    <ErrorMessage error={passwordError} />
                </form>
                <div className="flex justify-around items-center mt-[20px]">
                    <Checkbox
                        crossOrigin="anonymous"
                        defaultChecked
                        inputRef={permission}
                        className="bg-neutral checked:bg-accent dark:checked:bg-dark-purple"
                    />
                    <div className="text-[12px] md:text-sm 2xl:text-base">
                        I want to receive inspiration, marketing promotions and
                        updates via email.
                    </div>
                </div>
                <button
                    onClick={submitHandler}
                    className="rounded bg-accent uppercase p-3 text-base mt-[20px] drop-shadow-md 2xl:text-lg dark:bg-dark-purple hover:opacity-60 transition-all"
                >
                    Sign up
                </button>
                <Link
                    to="/login"
                    className="no-underline self-end mt-[20px] text-[12px] cursor-pointer md:text-sm 2xl:text-base opacity-50 hover:text-primary"
                >
                    Already have an account? Sign in
                </Link>
                <div className="text-[10px] text-center mt-[34px] md:text-[12px] opacity-50">
                    Copyright © SHY {new Date().getFullYear()}
                </div>
                <div className="absolute top-10 right-10">
                    <DarkModeSwitcher />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
