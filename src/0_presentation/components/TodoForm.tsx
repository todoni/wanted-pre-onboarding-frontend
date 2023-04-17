import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTodo } from "../../1_application/todo";
import { Todo } from "../../2_domain/Todo";

interface Props {
  onCreate: (todo: string) => void;
}

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { handleCreateTodo } = useTodo();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreateTodo(todo);
    setTodo("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="new-todo-input"
        type="text"
        value={todo}
        onChange={handleInputChange}
      />
      <button data-testid="new-todo-add-button" type="submit">
        추가
      </button>
    </form>
  );
};

export default TodoForm;
