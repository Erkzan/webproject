import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";

function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/profile/register", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/MyProfile/" + registerData.username);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <title>Register</title>
      <h1 className={classes.welcome_header}>Welcome!</h1>
      <p className={classes.register_header}>Register your account</p>

      <div className={classes.register_page}>
        <form onSubmit={register}>
          <h3 className={classes.username_header}>Username</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          ></input>
          <h3 className={classes.display_name_header}>Display name</h3>
          <input
            type="text"
            name="displayName"
            placeholder="Display name"
            onChange={handleChange}
          ></input>
          <h3 className={classes.email_header}>Email</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button className={classes.register_button} type="submit">
            Register
          </button>
          <div className={classes.login_prompt}>
            Already have an account?{" "}
            <button className={classes.login_button} onClick={goToLogin}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;