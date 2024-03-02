import { TodoItemType } from "../types";

export const editTodoItemMessage = (e: React.FocusEvent<HTMLSpanElement>, todoItems: TodoItemType[], id: string): TodoItemType[] => {
  const newMessage = e.currentTarget.textContent || "";

  const updatedTodoItems = todoItems.map((item) => {
    if (item.id === id) {
      return { ...item, message: newMessage };
    }

    return item;
  });

  return updatedTodoItems;
}