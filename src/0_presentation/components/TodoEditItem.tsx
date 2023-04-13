import React from "react";
import { Todo } from "../../2_domain/Todo";
import { useTodo } from "../../1_application/todo";

interface TodoProps {
  todo: Todo;
}

const TodoEditItem = ({ todo }: TodoProps) => {
  const {
    editTodo,
    editedTodo,
    fetchData,
    handleCheckboxChange,
    handleSaveClick,
    handleCancelClick,
    handleInputChange,
  } = useTodo();

  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => handleCheckboxChange(todo)}
      />
      <input
        type="text"
        value={editedTodo}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSaveClick}>저장</button>
      <button onClick={handleCancelClick}>취소</button>
    </li>
  );
};

export default React.memo(TodoEditItem);
