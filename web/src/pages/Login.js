 import { useNavigate } from "react-router-dom";
import classes from "./Authpage.module.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import image from "../health.png"

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cookies = new Cookies();
  const loginHandler = async () => {
    try {
      setLoading(true);

      const data = {
        email: email,
        password: password,
      };
      // setTimeout(() => {
      //   setLoading(false)
      // }, 3000)
      const response = await fetch("https://health-form-server.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
        console.log(responseData.message);
        return;
      }
      navigate("admin")
      // Add code to navigate to home page
      cookies.set("user-id", response.user);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes["form"]}>
        <img src={image} style={{width:"70px",alignSelf:"center",margin:"auto"}} />
        <header>Login</header>
        <form action="#">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={loginHandler}
            type="button"
            className={
              loading ? `${classes.activeButton}` : `${classes.button}`
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "10px",
            color: "red",
          }}
        >
          {error && error}
        </p>
        
      </div>
    </div>
  );
}
