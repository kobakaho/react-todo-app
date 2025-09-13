import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Timestamp, writeBatch, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Todo, TodoFormData } from "../../../types/todo";
import { getTodos } from "../api/Todos/getTodos";
import { createTodo } from "../api/Todos/createTodo";
import { updateTodo } from "../api/Todos/updateTodo";
import { deleteTodo } from "../api/Todos/deleteTodo";

export const useTodos = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!taskId) return;
    const fetchTodos = async () => {
      const fetched = await getTodos(taskId);
      setTodos(fetched.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    };
    fetchTodos();
  }, [taskId]);

  const addTodo = useCallback(async (data: TodoFormData) => {
    if (!taskId) return;
    const newOrder = todos.length;
    // Firestoreへの追加を待ってからUIを更新
    const docRef = await createTodo(taskId, { ...data, order: newOrder });
    const now = Timestamp.now();
    const newTodo: Todo = {
      id: docRef.id,
      ...data,
      order: newOrder,
      createdAt: now,
      updateAt: now,
    };
    setTodos((prev) => [...prev, newTodo]);
  }, [taskId, todos.length]);

  const updateTodoItem = useCallback(async (todoId: string, data: Partial<TodoFormData>) => {
    if (!taskId) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, ...data, updateAt: Timestamp.now() } : todo
      )
    );
    // Firestoreをバックグラウンドで更新
    try {
      await updateTodo(taskId, todoId, data);
    } catch (error) {
      console.error("todoの更新に失敗しました。:", error);
    }
  }, [taskId]);

  const deleteTodoItem = useCallback(async (todoId: string) => {
    if (!taskId) return;
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    // Firestoreをバックグラウンドで更新
    try {
      await deleteTodo(taskId, todoId);
    } catch (error) {
      console.error("todoの削除に失敗しました。:", error);
    }
  }, [taskId]);

  const reorderTodos = useCallback(async (reorderedTodos: Todo[]) => {
    if (!taskId) return;

    const updatedWithOrder = reorderedTodos.map((todo, index) => ({
      ...todo,
      order: index,
    }));

    // UIを即時更新
    setTodos(updatedWithOrder);

    // Firestoreをバッチ更新
    try {
      const batch = writeBatch(db);
      updatedWithOrder.forEach((todo) => {
        const ref = doc(db, "tasks", taskId, "todos", todo.id);
        batch.update(ref, { order: todo.order });
      });
      await batch.commit();
    } catch (error) {
      console.error("todoの並び替えに失敗しました。:", error);
    }
  }, [taskId]);

  return { todos, addTodo, updateTodoItem, deleteTodoItem, reorderTodos };
};