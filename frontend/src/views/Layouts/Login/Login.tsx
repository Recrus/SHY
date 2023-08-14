import React, { FormEvent, useState } from "react";
import classes from "./Login.module.css";
import logo from "../../../media/images/Landing/logo.png";
import { visibilityHandler } from "../../../functions/visibilityPass";
import { Link } from "react-router-dom";

import { useStateContext } from "../../../context/StateContext";
import axiosFetch from "../../../plugins/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setToken } = useStateContext();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axiosFetch.post("/auth/login", {
                email,
                password,
            });

            const data = response.data;

            setToken(data.access_token);
        } catch (error: any) {
            if (error.response) {
                const data = error.response.data;
                const {
                    email: emailError,
                    password: passwordError,
                    error: errorMessage,
                } = data;
                setError(true);

                if (emailError) {
                    setErrorMessage(emailError);
                } else if (passwordError) {
                    setErrorMessage(passwordError);
                } else if (errorMessage) {
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            } else {
                console.log("Error", error.message);
            }
        }
    };

    return (
        <main className={classes.container}>
            <div className={classes.login}>
                <img className={classes.logo} src={logo} alt="" />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.input_login_container}>
                        <input
                            className={classes.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.input_pass_container}>
                        <input
                            className={classes.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className={classes.notVisible}
                            onClick={visibilityHandler}
                        ></button>
                    </div>
                    <button className={classes.button} type="submit">
                        Login
                    </button>
                </form>
                <div className={error ? classes.error : classes.errorView}>
                    {errorMessage === "Unauthorized"
                        ? "Incorrect login or password"
                        : errorMessage}
                </div>
                <Link to="/signup" className={classes.signup}>
                    SignUp
                </Link>
            </div>
        </main>
    );
};

export default Login;
