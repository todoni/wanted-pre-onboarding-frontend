import { TodoRepository } from "../2_domain/TodoRepository";
import { HttpTodoRepository } from "../3_infrastructure/HttpTodoRepository";
import { Todo } from "../2_domain/Todo";

const todoRepository = HttpTodoRepository();

export const TodoService = () => {
  const getTodos = async (): Promise<Todo[]> => {
    const response = await todoRepository.get();
    return response.data;
  };

  const createTodo = async (todo: string): Promise<void> => {
    await todoRepository.create(todo);
  };

  const updateTodo = async (todo: Todo): Promise<void> => {
    await todoRepository.update(todo);
  };

  const deleteTodo = async (todo: Todo): Promise<void> => {
    await todoRepository.deleteById(todo);
  };
  return { getTodos, createTodo, updateTodo, deleteTodo };
};
