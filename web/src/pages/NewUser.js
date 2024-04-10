import classes from "./Authpage.module.css";

const NewUser = () => {
  return (
    <div className={classes.container}>
      <div className={classes["form"]}>
        <header>Create a New User</header>
        <form action="#">
          <input
            // value={email}
            // onChange={(e) => {
            //   setEmail(e.target.value);
            // }}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            // value={password}
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button
            // onClick={loginHandler}
            type="button"
            className={classes.button}
          >
            {/* {loading ? "Logging in..." : "Login"} */}
            Create
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "10px",
            color: "red",
          }}
        ></p>
      </div>
    </div>
  );
};

export default NewUser;
