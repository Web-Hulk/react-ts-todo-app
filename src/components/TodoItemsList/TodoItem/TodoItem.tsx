type TodoItemProps = {
  id: string;
  completed: boolean;
  message: string;
  handleCheckbox: (id: string) => void;
  editItem: (e: React.FocusEvent<HTMLSpanElement>, id: string) => void;
  deleteItem: (id: string) => void;
};

export const TodoItem = ({
  id,
  completed,
  message,
  handleCheckbox,
  editItem,
  deleteItem,
}: TodoItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleCheckbox(id)}
      />

      <p>
        <span
          contentEditable
          onBlur={(e) => editItem(e, id)}
          suppressContentEditableWarning
        >
          {message}
        </span>

        <button onClick={() => deleteItem(id)}>X</button>
      </p>
    </div>
  );
};
