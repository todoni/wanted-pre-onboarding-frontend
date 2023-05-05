import { ITodoRepository } from "../2_domain/ITodoRepository";
import { Todo } from "../2_domain/Todo";
import axios, { AxiosResponse } from "axios";

class HttpTodoRepository implements ITodoRepository {
  API_URL = "https://www.pre-onboarding-selection-task.shop";

  public create = async (todo: string): Promise<Todo> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${this.API_URL}/todos`,
      method: "POST",
      data: {
        todo: todo,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: { response: { data: { message: string } } }) => {
        alert(error.response.data.message);
        return null;
      });
  };

  public get = async (): Promise<AxiosResponse<Todo[]>> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${this.API_URL}/todos`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  public update = async (todo: Todo): Promise<Todo> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${this.API_URL}/todos/${todo.id}`,
      method: "PUT",
      data: {
        todo: todo.todo,
        isCompleted: todo.isCompleted,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: { response: { data: { message: string } } }) => {
        alert(error.response.data.message);
        return null;
      });
  };

  public deleteById = async (todo: Todo): Promise<void> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${this.API_URL}/todos/${todo.id}`,
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(() => {})
      .catch((error: { response: { data: { message: string } } }) => {
        alert(error.response.data.message);
        throw new Error("Failed to delete todo.");
      });
  };
}

export default HttpTodoRepository;
