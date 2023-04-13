import React, { useState } from "react";
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
    <>
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
    </>
  );
};

const TodoNormalItem = ({ todo }: TodoProps) => {
  const { handleCheckboxChange, handleEditClick, handleDeleteClick } =
    useTodo();
  return (
    <>
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
    </>
  );
};

export { TodoEditItem, TodoNormalItem };
