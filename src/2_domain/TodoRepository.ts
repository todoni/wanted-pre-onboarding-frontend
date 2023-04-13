import { Todo } from "./Todo";
import { AxiosResponse } from "axios";

export interface TodoRepository {
  create(todo: string): Promise<Todo>;
  get(): Promise<AxiosResponse<Todo[]>>;
  update(todo: Todo): Promise<Todo>;
  deleteById(todo: Todo): Promise<void>;
}
