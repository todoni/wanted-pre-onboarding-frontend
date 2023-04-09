import React, { useState } from "react";
import { useAuthenticate } from "../1_application/authenticate";
import { Navigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const [disabled, setDisabled] = useState(false);

  const { user, authenticate } = useAuthenticate();
  if (!!user) return <Navigate to="/" />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    event.preventDefault();
    await authenticate(email, password)
      .then((e) => {
        alert("success");
      })
      .catch((e) => {
        alert(e);
      });
    setDisabled(false);
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
      <button data-testid="signup-button" type="submit" disabled={disabled}>
        {disabled ? "loading..." : "signup"}
      </button>
    </form>
  );
};

export default SignupPage;
