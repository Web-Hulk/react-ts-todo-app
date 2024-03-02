import { lazy, useEffect, useState } from "react";
import { addTodoItem } from "../../helpers/addTodoItem";
import { deleteTodoItem } from "../../helpers/deleteTodoItem";
import { editTodoItemMessage } from "../../helpers/editTodoItemMessage";
import { filterActiveTodoItems } from "../../helpers/filterActiveTodoItems";
import { filterTodoItemBy } from "../../helpers/filterTodoItemsBy";
import { getInputValue } from "../../helpers/getInputValue";
import { handleDarkMode } from "../../helpers/handleDarkMode";
import { toggleTodoItemsStatus } from "../../helpers/toggleTodoItemsStatus";
import { TodoItemType } from "../../types";
import "./App.scss";

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

  const onDarkModeToggle = () => {
    const newMode = handleDarkMode(isDarkMode);

    setIsDarkMode(newMode);
    localStorage.setItem("mode", JSON.stringify(newMode));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItemMessage(getInputValue(e));
  };

  const handleDeleteItem = (id: string) => {
    const newTodoItems = deleteTodoItem(todoItems, id);

    setTodoItems(newTodoItems);
    localStorage.setItem("todos", JSON.stringify(newTodoItems));
  };

  const handleRemoveCompletedItems = () => {
    const activeTodoItems = filterActiveTodoItems(todoItems);

    setTodoItems(activeTodoItems);
    localStorage.setItem("todos", JSON.stringify(activeTodoItems));
  };

  const handleCheckbox = (id: string) => {
    const updateTodoItem = toggleTodoItemsStatus(todoItems, id);

    setTodoItems(updateTodoItem);
    localStorage.setItem("todos", JSON.stringify(updateTodoItem));
  };

  const handleItemEdit = (e: React.FocusEvent<HTMLSpanElement>, id: string) => {
    const updatedTodoItems = editTodoItemMessage(e, todoItems, id);

    setTodoItems(updatedTodoItems);
    localStorage.setItem("todos", JSON.stringify(updatedTodoItems));
  };

  const handleFilterTodoItemByName = (name: string) => {
    const filterTodoItemsBasedOnName = filterTodoItemBy(name);

    setTodoItems(filterTodoItemsBasedOnName);
  };

  const handleAddTodoItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoItemMessage !== "") {
      const newItem = addTodoItem(todoItemMessage, todoItems);

      setTodoItems(newItem);
      setTodoItemMessage("");

      localStorage.setItem("todos", JSON.stringify(newItem));
    }
  };

  return (
    <div className="todo-container">
      <TodoHeader isDarkMode={isDarkMode} handleDarkMode={onDarkModeToggle} />

      <TodoInput
        todoItemMessage={todoItemMessage}
        handleInput={handleInput}
        addTodoItem={handleAddTodoItem}
      />

      <TodoItemsList
        todoItems={todoItems}
        handleCheckbox={handleCheckbox}
        editItem={handleItemEdit}
        deleteItem={handleDeleteItem}
      />

      <TodoFooter
        todoItems={todoItems}
        filterTodoItems={handleFilterTodoItemByName}
        removeCompletedItems={handleRemoveCompletedItems}
      />
    </div>
  );
};

export default App;
