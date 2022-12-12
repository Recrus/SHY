import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import logo from "../../media/images/SHY_free-file.png";
import { visibilityHandler } from "../../functions/visibilityPass";
import { request } from "../../functions/request";
import { useContext } from "react";
import { AuthContext } from "../../context";

const Login = () => {
  const [user, setUser] = useState({ login: "", password: "" });
  const [authData, setAuthData] = useState([]);
  const { setIsAuth } = useContext(AuthContext);
  const [errorView, setErrorView] = useState(classes.error);

  const fetchData = async () => {
    let response = await request("/api/logged");
    setAuthData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const logins = [];
    const passwords = [];
    let prompt = [user.login, user.password];
    authData.forEach((el) => {
      logins.push(el.login);
      passwords.push(el.password);
    });
    let res;
    if (logins.indexOf(prompt[0]) !== -1) {
      res = logins.indexOf(prompt[0]);
    } else {
      res = false;
    }
    if (passwords[res] === prompt[1]) {
      setIsAuth(true);
      localStorage.setItem("auth", "true");
    } else {
      setIsAuth(false);
      setErrorView(`${classes.error} ${classes.errorView}`);
    }
  };

  return (
    <main className={classes.container}>
      <div className={classes.login}>
        <img className={classes.logo} src={logo} alt="" />
        <form className={classes.form}>
          <div className={classes.input_login_container}>
            <input
              className={classes.input}
              type="text"
              placeholder="Login"
              onChange={(e) => setUser({ ...user, login: e.target.value })}
            />
          </div>
          <div className={classes.input_pass_container}>
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              className={classes.notVisible}
              onClick={visibilityHandler}
            ></button>
          </div>
          {/*make visability for pass*/}
          <button onClick={submitHandler} className={classes.button}>
            Return
          </button>
        </form>
        <div className={errorView}>Incorrect login or password</div>
      </div>
    </main>
  );
};

export default Login;
