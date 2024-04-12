import { useState } from "react";
import classes from "./Authpage.module.css";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleClick = () => {
    return navigate("/admin")
  };
  const createHandler = async () => {
    try {
      setLoading(true);

      const data = {
        email: email,
        password: password,
      };
      // setTimeout(() => {
      //   setLoading(false)
      // }, 3000)
      const response = await fetch("http://localhost:1234/create-user/", {
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
      navigate('/admin')
      // Add code to navigate to the homne page

      alert("User Created Succesfully");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="NewUser">
        <button class="Admin_showDetailsButton__aa83D" onClick={handleClick}>Back</button>
    
    <div className={classes.container}>
      <div className={classes["form"]}>
      
        <header>Create a New User</header>
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
            onClick={createHandler}
            type="button"
            className={classes.button}
          >
            {loading ? "Creating User..." : "Create User"}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "10px",
            color: "red"
          }}
        >
          {error & error}
        </p>
      </div>
      </div>
      </div>
  );
};

export default NewUser;
