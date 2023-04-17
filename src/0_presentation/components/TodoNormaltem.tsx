import React from "react";
import { Todo } from "../../2_domain/Todo";
import { useTodo } from "../../1_application/todo";

interface TodoProps {
  todo: Todo;
}

const TodoNormalItem = ({ todo }: TodoProps) => {
  const { handleCheckboxChange, handleEditClick, handleDeleteClick } =
    useTodo();
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => handleCheckboxChange(todo)}
      />
      {todo.todo}
      <button data-testid="modify-button" onClick={() => handleEditClick(todo)}>
        수정
      </button>
      <button
        data-testid="delete-button"
        onClick={() => handleDeleteClick(todo)}
      >
        삭제
      </button>
    </li>
  );
};

export default React.memo(TodoNormalItem);
