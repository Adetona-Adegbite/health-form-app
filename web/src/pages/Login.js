// import { useNavigate } from "react-router-dom";
import classes from "./Authpage.module.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Login() {
  const[email,setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState('')
  const cookies = new Cookies()
  const loginHandler = async () => {
    try {
      setLoading(true);

      const data = {
        email: email,
        password: password
      }
      // setTimeout(() => {
      //   setLoading(false)
      // }, 3000)
      const response = await fetch('http://localhost:1234/login/', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      const responseData = await response.json()
      if (!response.ok) {
        setError(responseData.message)
        console.log(responseData.message);
        return
      }
      cookies.set('user-id',response.user)

    }
        catch (e) {
      
    }
    finally {
      
    }
     
    
    setLoading(false);

  }
  return (
    <div className={classes.container}>
      <div className={classes["form"]}>
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
            className={loading?`${classes.activeButton}`:`${classes.button}`}
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
        <div className={classes.signup}>
          <span className={classes.signup}>
            Don't have an account?
            <label for="check">Signup</label>
          </span>
        </div>
      </div>
    </div>
  );
}
