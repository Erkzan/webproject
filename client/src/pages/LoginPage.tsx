import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/profile/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      navigate("/MyProfile/" + loginData.username);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const goToRegister = () => {
    navigate("/register"); 
  };

  return (
    <>
      <title>Login</title>
      <h1 className={classes.welcome_header}>Welcome!</h1>
      <p className={classes.login_header}>Login to your account</p>
      <div className={classes.login_page}>
        <form onSubmit={login}>
          <h3 className={classes.username_header}>Username</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          ></input>
          <h3 className={classes.password_header}>Password</h3>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <div></div>
          <button className={classes.login_button} type="submit">
            Login
          </button>
          <div className={classes.register_prompt}>
            Don't have an account?
            <button className={classes.register_button} onClick={goToRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;