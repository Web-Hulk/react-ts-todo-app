import { TodoItemType } from "../types";

export const toggleTodoItemsStatus = (todoItems: TodoItemType[], id: string): TodoItemType[] => {
  return todoItems.map((item) => {
    if (item.id === id) {
      return { ...item, active: !item.active, completed: !item.completed };
    }

    return item;
  });
}