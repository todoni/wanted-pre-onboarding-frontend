import { useState, useEffect } from "react";
import { TodoService } from "../1_application/todoService";
import { Todo } from "../2_domain/Todo";
import TodoForm from "./TodoForm";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { getTodos, createTodo, updateTodo } = TodoService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTodo = async (newTodo: string) => {
    try {
      const todo = await createTodo(newTodo);
      console.log(todo);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (todo: Todo) => {
    todo.isCompleted = !todo.isCompleted;
    await updateTodo(todo);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleCheckboxChange(todo)}
              />
              {todo.todo}
            </li>
          ))
        ) : (
          <p>할 일이 없습니다</p>
        )}
      </ul>
      <TodoForm onCreate={handleCreateTodo} />
    </div>
  );
};

export default TodoPage;
