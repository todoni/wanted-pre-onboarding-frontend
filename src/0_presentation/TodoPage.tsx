import { useState, useEffect } from "react";
import { TodoService } from "../1_application/todoService";
import { Todo } from "../2_domain/Todo";
import TodoForm from "./components/TodoForm";
import { useAuth } from "../1_application/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import TodoNormalItem from "./components/TodoNormaltem";
import TodoEditItem from "./components/TodoEditItem";
import { useTodo } from "../1_application/todo";
import TodoList from "./components/TodoList";
import React from "react";

const TodoPage = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { todos, fetchData } = useTodo();

  const handleLogoutClick = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isAuthenticated()) return <Navigate to="/signin" />;
  return (
    <div className="common">
      <h1>Todo List</h1>
      {todos.length > 0 ? <TodoList /> : <p>할 일이 없습니다</p>}
      <TodoForm />
      <button className="logout" onClick={handleLogoutClick}>
        logout
      </button>
    </div>
  );
};

export default React.memo(TodoPage);
