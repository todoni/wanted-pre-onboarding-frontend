import { useState, useEffect } from "react";
import { TodoService } from "../1_application/todoService";
import { Todo } from "../2_domain/Todo";
import TodoForm from "./TodoForm";
import { useRef } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editedTodo, setEditedTodo] = useState("");

  const { getTodos, createTodo, updateTodo } = TodoService();
  const fetchData = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //useEffect(() => {}, [todos]);

  const handleCreateTodo = async (newTodo: string) => {
    try {
      const todo = await createTodo(newTodo);
      console.log(todo);
      fetchData();
      //const updatedTodos = await getTodos();
      //setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (todo: Todo) => {
    todo.isCompleted = !todo.isCompleted;
    await updateTodo(todo);
    fetchData();
    //const updatedTodos = await getTodos();
    //setTodos(updatedTodos);
  };

  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditedTodo(todo.todo);
  };

  const handleCancelClick = () => {
    setEditTodo(null);
    setEditedTodo("");
  };

  const handleSaveClick = async () => {
    if (editTodo) {
      try {
        const updatedTodo = { ...editTodo, todo: editedTodo };
        await updateTodo(updatedTodo);
        const updatedTodos = await getTodos();
        setTodos(updatedTodos);
        setEditTodo(null);
        setEditedTodo("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {editTodo === todo ? (
                <>
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                  <button onClick={handleSaveClick}>저장</button>
                  <button onClick={handleCancelClick}>취소</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleCheckboxChange(todo)}
                  />
                  {todo.todo}
                  <button
                    data-testid="modify-button"
                    onClick={() => handleEditClick(todo)}
                  >
                    수정
                  </button>
                  <button data-testid="delete-button">삭제</button>
                </>
              )}
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
