import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useAuth } from "../1_application/Auth";
import { useTodo } from "../1_application/todo";

const TodoPage = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { todos, fetchData } = useTodo();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLogoutClick = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      return;
    }

    if (todos.length === 0 && isLoaded === false) {
      fetchData();
      setIsLoaded(true);
    }
  }, [isAuthenticated, todos, fetchData, isLoaded]);

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
