import { HttpTodoRepository } from "../3_infrastructure/HttpTodoRepository";
import { Todo } from "../2_domain/Todo";

export const TodoService = () => {
  const todoRepository = HttpTodoRepository();

  const getTodos = async (): Promise<Todo[]> => {
    const response = await todoRepository.get();
    return response.data;
  };

  const createTodo = async (todo: string): Promise<Todo> => {
    const response = await todoRepository.create(todo);
    return response;
  };

  const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await todoRepository.update(todo);
    return response;
  };

  const deleteTodo = async (todo: Todo): Promise<void> => {
    await todoRepository.deleteById(todo);
  };
  return { getTodos, createTodo, updateTodo, deleteTodo };
};
