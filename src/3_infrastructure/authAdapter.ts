import { AuthenticationService } from "../1_application/ports";
import axios from "axios";

export const useAuth = (): AuthenticationService => {
  return {
    auth(email: Email, password: Password) {
      return axios({
        method: "POST",
        url: "https://www.pre-onboarding-selection-task.shop/auth/signup",
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    },
  };
};
