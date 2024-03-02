import { uniqueId } from "lodash";
import { TodoItemType } from "../types";

export const addTodoItem = (todoItemMessage: string, todoItems: TodoItemType[]): TodoItemType[] => {
  const newItem = {
    id: uniqueId(),
    message: todoItemMessage,
    active: true,
    completed: false,
  };

  const updateItems = [...todoItems, newItem];
  
  return updateItems;
}