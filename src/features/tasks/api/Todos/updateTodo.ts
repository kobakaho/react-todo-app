import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { TaskFormData } from "../../../../types/task";
import { db } from "../../../../firebase";

export const updateTodo = async (taskId: string, todoId: string, data: Partial<TaskFormData>) => {
  try{
    const taskRef = doc(db, "tasks", taskId, "todos", todoId);
    await updateDoc(taskRef, {
        ...data,
        updateAt: serverTimestamp(),
    });
    console.log("更新が成功しました。");
    } catch (error) {
    console.error("更新に失敗しました。", error);
    throw error;
  }
}