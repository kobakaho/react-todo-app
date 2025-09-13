import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export const deleteTodo = async (taskId: string, todoId: string) => {
  try{
    const docRef = doc(db, "tasks", taskId, "todos", todoId);
    await deleteDoc(docRef);
    console.log("削除が成功しました。");
    } catch (error) {
    console.error("削除に失敗しました。", error);
    throw error;
  }
}