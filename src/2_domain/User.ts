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

export const validateUser = (user: User): boolean => {
  console.log(user);
  if (!isEmailValid(user.email) || !isPasswordValid(user.password)) {
    return true;
  }
  return false;
};
