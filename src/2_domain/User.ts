export type User = {
  email: Email;
  password: Password;
};

const isEmailValid = (email: string): boolean => {
  const emailRegex = /.*@.*/;
  return emailRegex.test(email);
};

const isPasswordValid = (password: string): boolean => {
  return password.length >= 8;
};

export const validateUser = (user: User): void => {
  console.log(user);
  if (!isEmailValid(user.email)) {
    throw new Error("Invalid email format");
  }

  if (!isPasswordValid(user.password)) {
    throw new Error("Password must be at least 8 characters long");
  }
};
