import React, { useState, useCallback } from "react";
import { Todo, TodoFormData } from "../../../types/todo";
import { Draggable } from "@hello-pangea/dnd";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from "../styles/todoDetail.module.css";

interface TodoItemProps {
  todo: Todo;
  index: number;
  onUpdate: (todoId: string, data: Partial<TodoFormData>) => void;
  onDelete: (todoId: string) => void;
}

export default function TodoItem({ todo, index, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const handleUpdate = useCallback((data: Partial<TodoFormData>) => {
    onUpdate(todo.id, data);
  }, [onUpdate, todo.id]);

  const startEditing = useCallback(() => {
    if (todo.status) return;
    setIsEditing(true);
  }, [todo.status]);

  const finishEditing = useCallback(() => {
    if (editingTitle.trim() !== "" && editingTitle !== todo.title) {
    handleUpdate({ title: editingTitle });
    }
    setIsEditing(false);
  }, [editingTitle, todo.title, handleUpdate]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditingTitle(todo.title);
  }, [todo.title]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
    e.preventDefault();
    finishEditing();
    }
    if (e.key === "Escape") cancelEditing();
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={`${styles.todoItem} ${todo.status ? styles.completed : ""}`}
        >
        <Stack direction="row" alignItems="center" spacing={1}>
          <div {...provided.dragHandleProps}>
            <DragIndicatorIcon sx={{ cursor: "grab", color: "#999" }} />
          </div>
          <Tooltip title={todo.status ? "完了を取り消す" : "完了する"}>
            <Checkbox
              checked={todo.status}
              onChange={(e) => handleUpdate({ status: e.target.checked })}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Tooltip>
          {isEditing ? (
          <TextField
            value={editingTitle}
            autoFocus
            variant="standard"
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={handleKeyDown}
            fullWidth
          />
          ) : (
          <span
            onClick={startEditing}
            className={`${styles.todoTitle} ${todo.status ? styles.disabledTitle : ""}`}
          >
            {todo.title}
          </span>
          )}
          <Tooltip title="削除する">
            <IconButton onClick={() => onDelete(todo.id)} size="medium">
              <DeleteIcon fontSize="inherit" color="primary" />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    )}
    </Draggable>
  );
};

