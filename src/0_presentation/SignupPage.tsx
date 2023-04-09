import React, { useState } from "react";
import { signUp } from "../1_application/authentication";
import { UserRepository } from "../2_domain/UserRepository";
import { HttpUserRepository } from "../3_infrastructure/HttpUserRepository";

const SignupPage = () => {
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const [disabled, setDisabled] = useState(false);
  const userRepository = HttpUserRepository();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    event.preventDefault();
    try {
      await signUp({ email, password }, userRepository);
    } catch (error) {
      console.log(error);
    }
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
