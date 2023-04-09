import { User } from "../2_domain/User";
import { Todo, TodoContent } from "../2_domain/Todo";

export interface AuthenticationService {
  auth(email: Email, password: Password): Promise<User>;
}

export interface TodosStorageService {
  getAllTodos(): Todo[];
  getTodo(id: number): Todo;
  updateTodo(id: number, todo: TodoContent, isCompleted: boolean): void;
}

export interface NotificationService {
  notify(message: string): void;
}

export interface UserStorageService {
  user?: User;
  updateUser(user: User): void;
}
