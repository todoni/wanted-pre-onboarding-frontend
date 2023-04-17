import { TodoRepository } from "../2_domain/TodoRepository";
import { Todo } from "../2_domain/Todo";
import axios, { AxiosResponse } from "axios";

export const HttpTodoRepository = (): TodoRepository => {
  const API_URL = "https://www.pre-onboarding-selection-task.shop";

  const create = async (todo: string): Promise<Todo> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${API_URL}/todos`,
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
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
        return null;
      });
  };

  const get = async (): Promise<AxiosResponse<Todo[]>> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${API_URL}/todos`,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const update = async (todo: Todo): Promise<Todo> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${API_URL}/todos/${todo.id}`,
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
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
        return null;
      });
  };

  const deleteById = async (todo: Todo): Promise<void> => {
    const access_token = localStorage.getItem("token");
    return await axios({
      url: `${API_URL}/todos/${todo.id}`,
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(() => {})
      .catch((error) => {
        alert(error.response.data.message);
        throw new Error("Failed to delete todo.");
      });
  };

  return { create, get, update, deleteById };
};
