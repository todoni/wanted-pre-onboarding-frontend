import { Todo } from "./Todo";
import { AxiosResponse } from "axios";

export interface TodoRepository {
  create(todo: string): Promise<void>;
  get(): Promise<AxiosResponse<Todo[]>>;
  update(todo: Todo): Promise<void>;
  deleteById(todo: Todo): Promise<void>;
}
