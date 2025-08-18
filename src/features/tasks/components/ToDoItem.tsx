import React from "react";
import styles from "../styles/todo.module.css";

interface TodoItemProps {
    id: number;
    text: string;
    onDelete: (id: number) => void;

}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, onDelete }) => {
    return (
        <li className={styles.todoItem}>
            {text}
            <button onClick={() => onDelete(id)} className={styles.deleteButton}>
                ✖
            </button>
        </li>
    );
};

export default TodoItem;
