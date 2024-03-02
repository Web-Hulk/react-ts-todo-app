import { Moon, Sun } from "react-feather";

type TodoHeaderProps = {
  isDarkMode: boolean;
  handleDarkMode: () => void;
};

export const TodoHeader = ({ isDarkMode, handleDarkMode }: TodoHeaderProps) => {
  return (
    <div>
      <h1>TODO</h1>

      {isDarkMode ? (
        <Moon onClick={handleDarkMode} />
      ) : (
        <Sun onClick={handleDarkMode} />
      )}
    </div>
  );
};

export default TodoHeader;
