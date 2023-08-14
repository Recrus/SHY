import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../media/logo-nobg.svg";
import DarkModeSwitcher from "../../../components/UI/DarkModeSwitcher/DarkModeSwitcher";
import { Checkbox } from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios";

import { useStateContext } from "../../../context/StateContext";

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
        <div className="h-screen w-screen dark:bg-dark-blue ease-in-out duration-300">
            <div className="max-w-[370px] mx-auto flex justify-center flex-col font-primary pt-20 md:max-w-[680px] 2xl:max-w-[800px]">
                <div className="flex items-center flex-col mb-[20px]">
                    <img
                        src={logo}
                        alt="#"
                        className="h-[125px] w-[125px] mr-5 2xl:h-[150px] 2xl:w-[150px]"
                    />
                    <div className="text-lg dark:text-gray">Sign up</div>
                </div>
                <form className="grid grid-cols-2 gap-7">
                    <input
                        type="text"
                        ref={firstName}
                        name="fname"
                        className="bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg"
                        placeholder="First name"
                    />

                    <input
                        type="text"
                        ref={lastName}
                        name="lname"
                        className="bg-neutral border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg"
                        placeholder="Last name"
                    />
                    {firstNameError && (
                        <div className="text-red-500 text-xs mt-1">
                            {firstNameError}
                        </div>
                    )}

                    {lastNameError && (
                        <div className="text-red-500 text-xs mt-1">
                            {lastNameError}
                        </div>
                    )}

                    <input
                        type="email"
                        ref={email}
                        name="email"
                        className="bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg"
                        placeholder="Email"
                    />
                    {emailError && (
                        <div className="text-red-500 text-xs mt-1">
                            {emailError}
                        </div>
                    )}

                    <input
                        type="password"
                        ref={password}
                        className="bg-neutral col-span-2 border-solid border-2 border-gray rounded p-4 2xl:placeholder:text-lg"
                        placeholder="Password"
                    />
                    {passwordError && (
                        <div className="text-red-500 text-xs mt-1">
                            {passwordError}
                        </div>
                    )}
                </form>
                <div className="flex justify-around items-center mt-[20px]">
                    {/*@ts-ignore*/}
                    <Checkbox
                        defaultChecked
                        inputRef={permission}
                        className="bg-neutral checked:bg-accent dark:checked:bg-dark-purple"
                    />
                    <div className="text-[12px] md:text-sm 2xl:text-base dark:text-gray">
                        I want to receive inspiration, marketing promotions and
                        updates via email.
                    </div>
                </div>
                <button
                    onClick={submitHandler}
                    className="rounded bg-accent text-neutral uppercase p-3 text-base mt-[20px] drop-shadow-md 2xl:text-lg dark:bg-dark-purple"
                >
                    Sign up
                </button>
                <Link
                    to="/login"
                    className="text-gray no-underline self-end mt-[20px] text-[12px] cursor-pointer md:text-sm 2xl:text-base"
                >
                    Already have an account? Sign in
                </Link>
                <div className="text-[10px] text-gray text-center mt-[34px] md:text-[12px]">
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
