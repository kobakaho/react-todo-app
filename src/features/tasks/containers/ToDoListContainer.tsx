import { useState, FormEvent } from "react";
import { Todo } from "../../../types/todo";
import { initialTodos } from "../mocks/todo";
import TodoItem from "../components/ToDoItem";
import styles from "../styles/todo.module.css";

export default function ToDoListContainer() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(), // ユニークなIDを生成
      text: newTodoText,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };
  
  const handleDeleteTodo = (idToDelete: number) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));
  };

  const handleToggleTodo = (idToToggle: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onDelete={handleDeleteTodo}
                    onToggle={handleToggleTodo}
                />
                ))}
            </ul>
        </div>
    </div>
    );
};

