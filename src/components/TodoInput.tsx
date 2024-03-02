type TodoInputProps = {
  todoItemMessage: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodoItem: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TodoInput = ({
  todoItemMessage,
  handleInput,
  addTodoItem,
}: TodoInputProps) => {
  return (
    <input
      type="text"
      name="message"
      placeholder="Create a new todo..."
      value={todoItemMessage}
      onChange={handleInput}
      onKeyDown={addTodoItem}
    />
  );
};

export default TodoInput;
