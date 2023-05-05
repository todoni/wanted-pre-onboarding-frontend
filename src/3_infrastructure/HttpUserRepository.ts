import axios, { AxiosResponse } from "axios";
import { IUserRepository } from "../2_domain/IUserRepository";
import { User } from "../2_domain/User";

class HttpUserRepository implements IUserRepository {
  API_URL = "https://www.pre-onboarding-selection-task.shop";

  signUp = async (user: User, onSuccess: () => void): Promise<void> => {
    return await axios({
      url: `${this.API_URL}/auth/signup`,
      method: "POST",
      data: {
        email: user.email,
        password: user.password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        alert("회원가입이 완료 되었습니다.");
        onSuccess();
      })
      .catch((err: { response: { data: { message: string } } }) =>
        alert(err.response.data.message)
      );
  };

  public signIn = async (user: User, onSuccess: () => void): Promise<void> => {
    return await axios({
      url: `${this.API_URL}/auth/signin`,
      method: "POST",
      data: {
        email: user.email,
        password: user.password,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response: AxiosResponse<{ access_token: string }>) => {
        localStorage.setItem("token", response.data.access_token);
        onSuccess();
      })
      .catch((error: { response: { data: { message: string } } }) =>
        alert(error.response.data.message)
      );
  };
}

export default HttpUserRepository;
