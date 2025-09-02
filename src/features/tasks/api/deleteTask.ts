import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteTask = async (id: string) => {
  try{
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
    console.log("削除が成功しました。");
    } catch (error) {
    console.error("削除に失敗しました。", error);
    throw error;
  }
}