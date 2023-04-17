import React, { useState } from "react";
import { validateUser } from "../2_domain/User";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../1_application/Auth";
import "./styles.css";

const SigninPage = () => {
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated()) return <Navigate to="/todo" />;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password }, () => navigate("/todo"));
  };

  return (
    <div className="common">
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          data-testid="email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          data-testid="signin-button"
          type="submit"
          disabled={validateUser({ email, password })}
        >
          signin
        </button>
      </form>
      <p>
        new to here?
        <button onClick={() => navigate("/signup")}>signup</button>
      </p>
    </div>
  );
};

export default SigninPage;
