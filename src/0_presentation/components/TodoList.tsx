import React from "react";
import TodoEditItem from "./TodoEditItem";
import TodoNormalItem from "./TodoNormaltem";
import { useTodo } from "../../1_application/todo";

const TodoList = () => {
  const { todos, editTodo } = useTodo();
  return (
    <ul>
      {todos.map((todo) =>
        editTodo === todo ? (
          <TodoEditItem key={todo.id} todo={todo} />
        ) : (
          <TodoNormalItem key={todo.id} todo={todo} />
        )
      )}
    </ul>
  );
};

export default React.memo(TodoList);
