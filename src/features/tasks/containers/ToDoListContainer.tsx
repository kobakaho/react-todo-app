import { useState } from "react";
import { Todo } from "../../../types/todo";
import { initialTodos } from "../mocks/todo";
import styles from "../styles/todo.module.css";

export default function ToDoListContainer() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

    return (
    <div className={styles.container}>
        <h1>todoリスト</h1>
        <div className={styles.tableContainer}>
            <form onSubmit={handleAddTodo} className={styles.form}>
                <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="新しいtodoを入力"
                aria-label="新しいtodo"
                required
                />
                <button type="submit" className={styles.submitButton}>追加</button>
            </form>
            <ul aria-live="polite" className={styles.description}>
                {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    </div>
    );
};

