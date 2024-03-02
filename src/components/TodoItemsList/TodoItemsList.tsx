import { TodoItemType } from "../../types";
import { TodoItem } from "./TodoItem/TodoItem";

type TodoItemsListProps = {
  todoItems: TodoItemType[];
  handleCheckbox: (id: string) => void;
  editItem: (e: React.FocusEvent<HTMLSpanElement>, id: string) => void;
  deleteItem: (id: string) => void;
};

const TodoItemsList = ({
  todoItems,
  handleCheckbox,
  editItem,
  deleteItem,
}: TodoItemsListProps) => {
  return (
    <>
      {todoItems.map(({ id, message, completed }) => (
        <TodoItem
          key={`Todo item-${id}`}
          id={id}
          completed={completed}
          message={message}
          handleCheckbox={handleCheckbox}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      ))}
    </>
  );
};

export default TodoItemsList;
