import React from "react";

const SignupPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        action="https://www.pre-onboarding-selection-task.shop/auth/signup"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input data-testid="email-input" type="email" required></input>
        <input data-testid="password-input" type="password" required></input>
        <button data-testid="signup-button" type="submit">
          signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
