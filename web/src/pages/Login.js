const Login = () => {
  return (
    <div className="container">
      <h2>Login Page</h2>
      <form>
        <div>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
