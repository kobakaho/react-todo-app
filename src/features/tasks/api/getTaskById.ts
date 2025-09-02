import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Task } from "../../../types/task";

export const getTaskById = async (id: string): Promise<Task | null> => {
  try {
    const docRef = doc(db, "tasks", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 取得したデータにドキュメントIDを加えて返す
      return { id: docSnap.id, ...docSnap.data() } as Task;
    } else {
      console.log("指定されたIDのタスクは見つかりませんでした。");
      return null;
    }
  } catch (error) {
    console.error("タスクの取得中にエラーが発生しました:", error);
    throw error;
  }
};

