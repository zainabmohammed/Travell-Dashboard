import { useState } from "react";
import "./style.css";
import { useAppStore } from "../../appStore";
import { message } from "antd";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useAppStore();

  const handleSubmit = () => {
    if (username === "admin" && password === "123") {
      setIsLogin(true);
    } else {
      message?.error("Login not correct!");
    }
  };

  return (
    <div className="login">


    <div className="wrapper">
      <div className="form-wrapper sign-in">
        <form>
          <h2>Login</h2>
          <div className="input-group">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
            />
            <label htmlFor>Username</label>
          </div>
          <div className="input-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <label htmlFor>Password</label>
          </div>
          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="button" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginScreen;
