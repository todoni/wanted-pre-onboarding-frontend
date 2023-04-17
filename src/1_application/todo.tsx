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
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
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

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const updatedTodoData = await updateTodo(updatedTodo);
      if (updatedTodoData) {
        const updatedTodoIndex = todos.findIndex(
          (todo) => todo.id === updatedTodoData.id
        );
        const newTodos = [...todos];
        newTodos[updatedTodoIndex] = updatedTodoData;
        setTodos(newTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTodo = async (newTodo: string) => {
    try {
      const newTodoData = await createTodo(newTodo);
      console.log(newTodoData);
      if (newTodoData) {
        setTodos((prevState) => [...prevState, newTodoData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodo(event.target.value);
  };

  const handleCheckboxChange = async (todo: Todo) => {
    todo.isCompleted = !todo.isCompleted;
    await handleUpdateTodo(todo);
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
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = async () => {
    if (editTodo) {
      const updatedTodo = { ...editTodo, todo: editedTodo };
      await handleUpdateTodo(updatedTodo);
      setEditTodo(null);
      setEditedTodo("");
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
    handleInputChange,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodo = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodo };
