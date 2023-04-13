import React, { useState, useEffect } from "react";
import { signIn } from "../1_application/authentication";
import { validateUser } from "../2_domain/User";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../1_application/Auth";

const SigninPage = () => {
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  //console.log(isAuthenticated);
  if (isAuthenticated()) return <Navigate to="/todo" />;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password }, () => navigate("/todo"));
    //navigate("/todo");
    //await signIn({ email, password }, () => navigate("/todo"));
  };

  /*useEffect(() => {
    if (isAuthenticated) {
      navigate("/todo");
    }
  }, [navigate, isAuthenticated]);*/
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
        signin
      </button>
    </form>
  );
};

export default SigninPage;
