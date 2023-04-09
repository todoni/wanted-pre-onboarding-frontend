import { UserRepository } from "../2_domain/UserRepository";
import { User } from "../2_domain/User";
import axios from "axios";

export const HttpUserRepository = (): UserRepository => {
  const API_URL = "https://www.pre-onboarding-selection-task.shop";

  const signUp = async (user: User): Promise<void> => {
    const response = await axios({
      url: `${API_URL}/auth/signup`,
      method: "POST",
      data: {
        email: user.email,
        password: user.password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      throw new Error("Failed to sign up");
    }
  };

  const signIn = async (user: User): Promise<void> => {
    const response = await axios({
      url: `${API_URL}/auth/signin`,
      method: "POST",
      data: {
        email: user.email,
        password: user.password,
      },
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 200) {
      throw new Error("Failed to sign up");
    }

    const data = await response.data;
    localStorage.setItem("token", data.token);
  };

  return { signUp, signIn };
};
