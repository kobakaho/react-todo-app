import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { TodoFormData } from "../../../../types/todo"

export const createTodo = async (id: string, task: TodoFormData) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("認証されていません。");
  }

  try {
  const docRef = await addDoc(collection(db, "tasks", id, "todos"), {
    ...task,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
  console.log("Todoの保存に成功しました ID: ", docRef.id);
  return docRef;
  } catch (error) {
  console.error("Todoの保存に失敗しました : ", error);
  throw error;
  }
}
