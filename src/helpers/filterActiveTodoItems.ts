import { TodoItemType } from "../types";

export const filterActiveTodoItems = (todoItems: TodoItemType[]): TodoItemType[] => {
  return todoItems.filter(
    (item) => item.completed === false
  );
};