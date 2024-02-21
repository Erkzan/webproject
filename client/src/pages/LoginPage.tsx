import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "emil",
    password: "hej",
  });

  const [error, setError] = useState("placeholder");

  const navigate = useNavigate();

  const signIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      console.log("sending login details")
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

      console.log(await response.text()); 

      // Handle success response as needed
    } catch (error) {
      console.error("Error posting data:", error);
      //setError(error.message);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email");
  };

  return (
    <>
      <title>Login to continue</title>
      <h1>Welcome!</h1>
      <p>Login to continue</p>

      <div className="login-page">
        <form onSubmit={signIn}>
          <h3 className="email-header">Email</h3>
          <input
            type="text"
            placeholder="namn"
            //value={loginData.username}
            onChange={handleChange}
          ></input>
          <h3 className="password-header">Password</h3>
          <input
            type="password"
            placeholder="Password"
            //value={loginData.password}
            onChange={handleChange}
          ></input>
          <div></div>
          {error && <p className="error-message">{error}</p>}
          <button className="login-button" type="submit">
            Log in
          </button>
          <div></div>
          <p className="forgot-password" onClick={handlePasswordReset}>
            Forgot password?
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
