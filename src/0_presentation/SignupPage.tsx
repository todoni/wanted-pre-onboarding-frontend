import React, { useState } from "react";
import { signUp } from "../1_application/authentication";
import { validateUser } from "../2_domain/User";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../1_application/Auth";

const SignupPage = () => {
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup({ email, password }, () => navigate("/signin"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        data-testid="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        data-testid="signup-button"
        type="submit"
        disabled={validateUser({ email, password })}
      >
        signup
      </button>
    </form>
  );
};

export default SignupPage;
