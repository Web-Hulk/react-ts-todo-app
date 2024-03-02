import { TodoItemType } from "../types";

export const deleteTodoItem = (todoItems: TodoItemType[], id: string): TodoItemType[] => {
  return todoItems.filter((item) => item.id !== id);
}