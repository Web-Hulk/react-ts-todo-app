import { TodoItemType } from "../types";

export const filterTodoItemBy = (name: string): TodoItemType[] => {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("todos") as string
  );

  let filterTodoItemsBasedOnName: TodoItemType[] = [];

  if (name === "active") {
    filterTodoItemsBasedOnName = todoItemsFromLocalStorage.filter(
      (item: TodoItemType) => item.active === true
    );
  } else if (name === "completed") {
    filterTodoItemsBasedOnName = todoItemsFromLocalStorage.filter(
      (item: TodoItemType) => item.completed === true
    );
  } else {
    filterTodoItemsBasedOnName = todoItemsFromLocalStorage;
  }

  return filterTodoItemsBasedOnName;
}