import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { TaskFormData } from "../../../../types/task";
import { db } from "../../../../firebase";

export const updateTask = async (id: string, data: Partial<TaskFormData>) => {
  try{
    const taskRef = doc(db, "tasks", id);
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