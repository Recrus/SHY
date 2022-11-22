import React from "react";
import classes from "./Login.module.css";
import logo from "../../media/images/SHY_free-file.png";

const Login = (props) => {
  return (
    <main className={classes.container}>
      <div className={classes.login}>
        <img className={classes.logo} src={logo} alt="" />
        <form className={classes.form}>
          <div className={classes.input_login_container}>
            <input className={classes.input} type="text" placeholder="Login" />
          </div>
          <div className={classes.input_pass_container}>
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
            />
          </div>
          {/*make visability for pass*/}
          <button
            onClick={(e) => e.preventDefault()}
            className={classes.button}
          >
            {props.data}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
