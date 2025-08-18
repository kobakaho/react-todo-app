import React from "react";
import styles from "../styles/todo.module.css";

interface TodoItemProps {
  id: number;
  text: string;
  completed?: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onDelete, onToggle }) => {
  return (
    <li className={styles.todoItem} id={`todo-item-${id}`}>
        <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
            aria-labelledby={`todo-text-${id}`}
            className={styles.checkbox}
        />
        <span id={`todo-text-${id}`}>
            {text}
        </span>
        <button onClick={() => onDelete(id)} className={styles.deleteButton}>
            ✖
        </button>
    </li>
  );
};

export default TodoItem;
