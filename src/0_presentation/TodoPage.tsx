import { useState, useEffect } from "react";
import { TodoService } from "../1_application/todoService";
import { Todo } from "../2_domain/Todo";
import TodoForm from "./TodoForm";
import { useAuth } from "../1_application/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import TodoNormalItem from "./components/TodoItems";
import TodoEditItem from "./components/TodoEditItem";
import { useTodo } from "../1_application/todo";
import TodoList from "./components/TodoList";
import React from "react";

const TodoPage = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { todos, editTodo, handleCreateTodo } = useTodo();

  const handleLogoutClick = () => {
    logout();
    navigate("/signin");
  };

  if (!isAuthenticated()) return <Navigate to="/signin" />;
  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleLogoutClick}>logout</button>
      {todos.length > 0 ? <TodoList /> : <p>할 일이 없습니다</p>}
      <TodoForm onCreate={handleCreateTodo} />
    </div>
  );
};

export default React.memo(TodoPage);
