import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Task } from "../../../../types/task";

export const getTaskById = (id: string, callback: (task: Task | null) => void) => {
  try {
    const docRef = doc(db, "tasks", id);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() } as Task);
      } else {
        console.log("指定されたタスクが存在しません。");
        callback(null);
      }
    });
  } catch (error) {
    console.error("タスクの取得中にエラーが発生しました:", error);
    throw error;
  }
};

