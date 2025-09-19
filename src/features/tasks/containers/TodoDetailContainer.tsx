import { useState, useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useTodos } from "../utils/useTodos";
import TodoItem from "../components/TodoItem";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/todoDetail.module.css";

export default function TodoDetail() {
  const [title, setTitle] = useState("");
  const { todos, addTodo, updateTodoItem, deleteTodoItem, reorderTodos } = useTodos();

  const handleAdd = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await addTodo({ title, status: false });
    setTitle("");
  }, [addTodo, title]);

  // 並び替え
  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(todos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    reorderTodos(reordered);
  }, [todos, reorderTodos]);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Box
        component="form"
        onSubmit={handleAdd}
        >
          <TextField
            className={styles.textField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="サブタスク"
            variant="outlined"
            required
            fullWidth
          />
          <Fab className={styles.addButton} aria-label="add" type="submit">
              <AddIcon />
          </Fab>
        </Box>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
        {(provided) => (
          <div
          className={styles.taskList}
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onUpdate={updateTodoItem}
              onDelete={deleteTodoItem}
            />
          ))}
          {provided.placeholder}
          </div>
        )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
