import { uniqueId } from "lodash";
import { lazy, useEffect, useState } from "react";
import { TodoItemType } from "../../types";
import "./App.scss";
import { handleDarkMode } from "../../helpers/handleDarkMode";

const TodoItemsList = lazy(() => import("../TodoItemsList/TodoItemsList"));
const TodoFooter = lazy(() => import("../TodoFooter"));
const TodoHeader = lazy(() => import("../TodoHeader"));
const TodoInput = lazy(() => import("../TodoInput"));

const App = () => {
  const [todoItemMessage, setTodoItemMessage] = useState<string>("");
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos") as string);

    todos
      ? setTodoItems(todos)
      : localStorage.setItem("todos", JSON.stringify([]));
  }, []);

  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("mode") as string);

    mode
      ? setIsDarkMode(mode)
      : localStorage.setItem("mode", JSON.stringify(false));
  }, []);

  // const handleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);

  //   localStorage.setItem("mode", JSON.stringify(!isDarkMode));
  // };

  const onDarkModeToggle = () => {
    setIsDarkMode(handleDarkMode(isDarkMode));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItemMessage(e.target.value);
  };

  const addTodoItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const todoItem = {
      id: uniqueId(),
      message: todoItemMessage,
      active: true,
      completed: false,
    };

    const updateItems = [...todoItems, todoItem];

    if (e.key === "Enter" && todoItemMessage !== "") {
      setTodoItems(updateItems);
      setTodoItemMessage("");

      localStorage.setItem("todos", JSON.stringify(updateItems));
    }
  };

  const deleteItem = (id: string) => {
    const filterTodoItems = todoItems.filter((item) => item.id !== id);

    setTodoItems(filterTodoItems);
    localStorage.setItem("todos", JSON.stringify(filterTodoItems));
  };

  const handleCheckbox = (id: string) => {
    const updateTodoItem = todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, active: !item.active, completed: !item.completed };
      }

      return item;
    });

    setTodoItems(updateTodoItem);
    localStorage.setItem("todos", JSON.stringify(updateTodoItem));
  };

  const removeCompletedItems = () => {
    const filterCompletedItems = todoItems.filter(
      (item) => item.completed === false
    );

    setTodoItems(filterCompletedItems);
    localStorage.setItem("todos", JSON.stringify(filterCompletedItems));
  };

  const filterTodoItems = (name: string) => {
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

    setTodoItems(filterTodoItemsBasedOnName);
  };

  const editItem = (e: React.FocusEvent<HTMLSpanElement>, id: string) => {
    const newMessage = e.currentTarget.textContent || "";

    const updateTodoItem = todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, message: newMessage };
      }

      return item;
    });

    setTodoItems(updateTodoItem);
    localStorage.setItem("todos", JSON.stringify(updateTodoItem));
  };

  return (
    <div className="todo-container">
      <TodoHeader isDarkMode={isDarkMode} handleDarkMode={onDarkModeToggle} />

      <TodoInput
        todoItemMessage={todoItemMessage}
        handleInput={handleInput}
        addTodoItem={addTodoItem}
      />

      <TodoItemsList
        todoItems={todoItems}
        handleCheckbox={handleCheckbox}
        editItem={editItem}
        deleteItem={deleteItem}
      />

      <TodoFooter
        todoItems={todoItems}
        filterTodoItems={filterTodoItems}
        removeCompletedItems={removeCompletedItems}
      />
    </div>
  );
};

export default App;
