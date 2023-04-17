import React, { createContext, useContext, useState } from "react";
import { Todo } from "../2_domain/Todo";
import { TodoService } from "../1_application/todoService";

type TodoContextType = {
  todos: Todo[];
  editTodo: Todo | null;
  editedTodo: string;
  fetchData: () => Promise<void>;
  handleCreateTodo: (newTodo: string) => Promise<void>;
  handleCheckboxChange: (todo: Todo) => Promise<void>;
  handleEditClick: (todo: Todo) => void;
  handleCancelClick: () => void;
  handleDeleteClick: (todo: Todo) => Promise<void>;
  handleSaveClick: () => Promise<void>;
  handleEditInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoContext = createContext<TodoContextType>({
  todos: [],
  editTodo: null,
  editedTodo: "",
  fetchData: async () => {},
  handleCreateTodo: async (newTodo: string) => {},
  handleCheckboxChange: async (todo: Todo) => {},
  handleEditClick: (todo: Todo) => {},
  handleCancelClick: () => {},
  handleDeleteClick: async (todo: Todo) => {},
  handleSaveClick: async () => {},
  handleEditInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
});

type Props = {
  children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editedTodo, setEditedTodo] = useState<string>("");
  const { getTodos, createTodo, updateTodo, deleteTodo } = TodoService();

  const fetchData = async () => {
    try {
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTodo = async (newTodo: string) => {
    try {
      await createTodo(newTodo);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedTodo(event.target.value);
  };

  const handleCheckboxChange = async (todo: Todo) => {
    todo.isCompleted = !todo.isCompleted;
    try {
      await updateTodo(todo);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditedTodo(todo.todo);
  };

  const handleCancelClick = () => {
    setEditTodo(null);
    setEditedTodo("");
  };

  const handleDeleteClick = async (todo: Todo) => {
    try {
      await deleteTodo(todo);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = async () => {
    if (editTodo) {
      try {
        const updatedTodo = { ...editTodo, todo: editedTodo };
        await updateTodo(updatedTodo);
        fetchData();
        setEditTodo(null);
        setEditedTodo("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const value = {
    todos,
    editTodo,
    editedTodo,
    fetchData,
    handleCreateTodo,
    handleCheckboxChange,
    handleEditClick,
    handleCancelClick,
    handleDeleteClick,
    handleSaveClick,
    handleEditInputChange,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodo = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodo };
