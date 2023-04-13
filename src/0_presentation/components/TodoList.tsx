import React from "react";
import { useTodo } from "../../1_application/todo";
import TodoEditItem from "./TodoEditItem";
import TodoNormalItem from "./TodoNormaltem";

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
