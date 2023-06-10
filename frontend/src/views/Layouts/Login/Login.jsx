import React from 'react';
import classes from "./Login.module.css";
import logo from "../../../media/images/Landing/logo.png";
import {visibilityHandler} from "../../../functions/visibilityPass.js";
import {Link} from "react-router-dom";

const Login = () => {

    return (
        <main className={classes.container}>
            <div className={classes.login}>
                <img className={classes.logo} src={logo} alt=""/>
                <form className={classes.form}>
                    <div className={classes.input_login_container}>
                        <input
                            className={classes.input}
                            type="text"
                            placeholder="Login"
                        />
                    </div>
                    <div className={classes.input_pass_container}>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Password"
                        />
                        <div
                            className={classes.notVisible}
                            onClick={visibilityHandler}
                        ></div>
                    </div>
                    <button className={classes.button}>
                        Login
                    </button>
                </form>
                {/*<div className={errorView}>Incorrect login or password</div>*/}
                <Link to="/signup" className={classes.signup}>
                    SignUp
                </Link>
            </div>
        </main>
    );
};

export default Login;
