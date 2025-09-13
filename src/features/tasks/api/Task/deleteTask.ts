import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

export const deleteTask = async (id: string) => {
  try{
    const todoSnapshot = await getDocs(collection(db, "tasks", id, "todos"));
    const deleteTodosPromises = todoSnapshot.docs.map((todoDoc) => {
      return deleteDoc(doc(db, "tasks", id, "todos", todoDoc.id));
    });
    await Promise.all(deleteTodosPromises);

    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
    console.log("削除が成功しました。");
    } catch (error) {
    console.error("削除に失敗しました。", error);
    throw error;
  }
}