export type TodoContent = string;

export type Todo = {
  id: number;
  todo: TodoContent;
  isCompleted: boolean;
  userId: number;
};
