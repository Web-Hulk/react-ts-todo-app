import { TodoItemType } from "../types";

type TodoFooterProps = {
  todoItems: TodoItemType[];
  filterTodoItems: (name: string) => void;
  removeCompletedItems: () => void;
};

type ButtonsData = {
  name: string;
  value: string;
};

const BUTTONS_DATA: ButtonsData[] = [
  { name: "All", value: "all" },
  { name: "Active", value: "active" },
  { name: "Completed", value: "completed" },
];

export const TodoFooter = ({
  todoItems,
  filterTodoItems,
  removeCompletedItems,
}: TodoFooterProps) => {
  return (
    <div>
      <p>{todoItems.length} item left</p>

      <div>
        {BUTTONS_DATA.map(({ name, value }) => (
          <button
            key={`Filter-${value}`}
            onClick={() => filterTodoItems(value)}
          >
            {name}
          </button>
        ))}
      </div>

      <button onClick={removeCompletedItems}>Clear Completed</button>
    </div>
  );
};

export default TodoFooter;
